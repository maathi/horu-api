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

async function checkDevice(ip, city, agent) {
  //just use the device agent instead | can also use provider name
  const query = `
      SELECT id
      FROM devices
      WHERE ip = $1 OR (city = $2 AND agent = $3)
    `

  let { rows } = await pool.query(query, [ip, city, agent])
  console.log("exists", rows[0])
  return rows[0]
}

async function addDevice(ip, city, country, loc, os, browser, agent) {
  // if (checkDevice(ip, city, agent)) return

  const name: string = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "-",
  })

  const text = `
      INSERT INTO devices (name, ip, city, country, loc, os, browser, agent)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `
  let { rows } = await pool.query(text, [
    name,
    ip,
    city,
    country,
    loc,
    os,
    browser,
    agent,
  ])
  console.log("created", rows[0])
  return rows[0]
}

module.exports = { getDevices, checkDevice, addDevice }
