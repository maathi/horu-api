const { pool } = require("../config/db")
const axios = require("axios")
import { Request, Response } from "express"
const requestIp = require("request-ip")
var parser = require("ua-parser-js")
const { addDevice, checkDevice } = require("./deviceController")

async function getVisits(req: Request, res: Response) {
  const text = `
    SELECT visits.id, referer, time, events, json_build_object(
            'id', devices.id,
            'name', name,
            'ip', ip,
            'city', city,
            'country', country,
            'location', location,
            'os', os,
            'browser', browser
          ) device
    FROM visits, devices
    WHERE devices.id = visits.device_id
    ORDER BY visits.id DESC
  `
  let { rows } = await pool.query(text)

  res.json(rows)
}

async function addVisit(req: Request, res: Response) {
  let ip = requestIp.getClientIp(req)
  let referer = req.headers.referer
  let agent = req.headers["user-agent"]
  let { browser, os } = parser(req.headers["user-agent"])

  try {
    let { data } = await axios.get(
      `${process.env.URL}/${ip}?token=${process.env.TOKEN}`
    )
    let { country, city, loc: location } = data

    let device = await checkDevice(ip, city, agent)

    if (!device)
      device = await addDevice(
        ip,
        city,
        country,
        location,
        os.name,
        browser.name,
        agent
      )

    const text = `INSERT INTO visits(referer, device_id)
       VALUES($1, $2) 
       RETURNING *
       `

    const values = [referer, device.id]
    let { rows } = await pool.query(text, values)
    res.json(rows[0])
  } catch (err) {
    console.log(err)
  }
}

async function addEvent(req: Request, res: Response) {
  const ip = requestIp.getClientIp(req)
  const { event } = req.body

  //adding events to the latest appearance of a visit with a given ip
  const text = `
   UPDATE visits
   SET events = array_append(events,$1::json)
   WHERE id = (SELECT v.id 
               FROM visits v, devices d
               WHERE v.device_id = d.id AND d.ip = $2
               ORDER BY v.id DESC
               LIMIT 1)
   RETURNING *
   `
  try {
    let { rows } = await pool.query(text, [event, ip])
    console.log("your rows", rows)
    res.json(rows)
  } catch (err) {
    console.log(">>>>>", err)
  }
}
module.exports = { getVisits, addVisit, addEvent }
