const { pool } = require("../config/db")
const axios = require("axios")
import { Request, Response } from "express"
const requestIp = require("request-ip")
var parser = require("ua-parser-js")

async function getVisits(req: Request, res: Response) {
  let { rows } = await pool.query("SELECT * FROM visits")
  res.json(rows)
}

async function addVisit(req: Request, res: Response) {
  let ip = requestIp.getClientIp(req)
  let referer = req.headers.referer
  let agent = req.headers["user-agent"]
  let { browser, os } = parser(req.headers["user-agent"])

  if (process.env.NODE_ENV === "development") {
    ip = req.headers["x-forwarded-for"]
    req.connection.remoteAddress
    req.socket.remoteAddress
    //req.connection.socket.remoteAddress
    ip = ip.replace(/^.*:/, "")

    ip = ""
  }

  try {
    let { data } = await axios.get(
      `${process.env.URL}/${ip}?token=${process.env.TOKEN}`
    )
    let { country, city, loc } = data

    const text =
      "INSERT INTO visits(referer, agent, os, browser, ip, country, city, loc) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
    const values = [
      referer,
      agent,
      os.name,
      browser.name,
      ip,
      country,
      city,
      loc,
    ]
    let { rows } = await pool.query(text, values)
    res.json(rows[0])
  } catch (err) {
    console.log(err)
  }
}

module.exports = { getVisits, addVisit }
