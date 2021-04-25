const { pool } = require("../config/db")
const axios = require("axios")
import { Request, Response } from "express"
const requestIp = require("request-ip")
var parser = require("ua-parser-js")
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator"

async function getDevices(req: Request, res: Response) {
  let { rows } = await pool.query("SELECT * FROM devices")

  res.json(rows)
}

async function checkDevice(ip) {
  //can also use provider name
  // const query = `
  //     SELECT id
  //     FROM devices
  //     WHERE ip = $1 OR (city = $2 AND agent = $3)
  //   `

  const query = `
  SELECT id
  FROM devices
  WHERE ip = $1 
`
  let { rows } = await pool.query(query, [ip])
  return rows[0]
}

async function getDeviceByName(req: Request, res: Response) {
  const { name } = req.params
  const text = `
    SELECT *
    FROM 
      devices d, 
      (
       SELECT device_id, 
              array_agg(
                json_build_object(
                 'id', v.id, 'time', v.time, 'referer', v.referer, 'events', v.events
                ) ORDER BY v.id DESC
              ) as visits
       FROM visits v
       GROUP BY v.device_id
      ) va
    WHERE d.id = va.device_id and name = $1
  `

  let { rows } = await pool.query(text, [name])

  res.json(rows[0])
}

async function addDevice(ip, city, country, location, os, browser, agent) {
  // if (checkDevice(ip, city, agent)) return

  const name: string = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "-",
  })

  const text = `
      INSERT INTO devices (name, ip, city, country, location, os, browser, agent)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `
  let { rows } = await pool.query(text, [
    name,
    ip,
    city,
    country,
    location,
    os,
    browser,
    agent,
  ])
  return rows[0]
}

module.exports = { getDevices, getDeviceByName, checkDevice, addDevice }
