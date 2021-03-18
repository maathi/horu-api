const { pool } = require("../config/db")
const axios = require("axios")
import { Request, Response } from "express"

async function getVisitors(req: Request, res: Response) {
  let { rows } = await pool.query("SELECT * FROM visitors")

  res.json(rows)
}

async function addVisitor(req: Request, res: Response) {
  let referer = req.headers.referer
  let userAgent = req.headers["user-agent"]
  let ip =
    // req.headers["x-forwarded-for"]
    req.connection.remoteAddress
  // req.socket.remoteAddress
  // req.connection.socket.remoteAddress
  ip = ip.replace(/^.*:/, "")

  if (process.env.NODE_ENV === "development") {
    ip = ""
  }

  try {
    let { data } = await axios.get(
      `${process.env.URL}/${ip}?token=${process.env.TOKEN}`
    )
    let { city, loc } = data

    const text =
      "INSERT INTO visitors(referer, useragent, ip, city, loc) VALUES($1, $2, $3, $4, $5) RETURNING *"
    const values = [referer, userAgent, ip, city, loc]
    let { rows } = await pool.query(text, values)
    res.json(rows[0])
  } catch (err) {
    console.log(err)
  }
}

module.exports = { getVisitors, addVisitor }
