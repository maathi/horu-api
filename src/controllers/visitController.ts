const { pool } = require("../config/db")
const axios = require("axios")
import { Request, Response } from "express"
const requestIp = require("request-ip")

async function getVisits(req: Request, res: Response) {
  let { rows } = await pool.query("SELECT * FROM visits")
  res.json(rows)
}

async function addVisit(req: Request, res: Response) {
  const ip = requestIp.getClientIp(req)
  console.log(">>>>>>>>", ip)

  let referer = req.headers.referer
  let agent = req.headers["user-agent"]
  // let ip =
  // req.headers["x-forwarded-for"]
  // req.connection.remoteAddress
  // req.socket.remoteAddress
  // req.connection.socket.remoteAddress
  // ip = ip.replace(/^.*:/, "")

  // if (process.env.NODE_ENV === "development") {
  //   ip = ""
  // }

  try {
    let { data } = await axios.get(
      `${process.env.URL}/${ip}?token=${process.env.TOKEN}`
    )
    let { city, loc } = data

    const text =
      "INSERT INTO visits(referer, agent, ip, city, loc) VALUES($1, $2, $3, $4, $5) RETURNING *"
    const values = [referer, agent, ip, city, loc]
    let { rows } = await pool.query(text, values)
    res.json(rows[0])
  } catch (err) {
    console.log(err)
  }
}

module.exports = { getVisits, addVisit }
