const { pool } = require("../config/db")

function addVisitor({ referer, userAgent, ip, city, loc }) {
  console.log(referer, userAgent, ip, city, loc)
  const text =
    "INSERT INTO visitors(referer, useragent, ip, city, loc) VALUES($1, $2, $3, $4, $5) RETURNING *"
  const values = [referer, userAgent, ip, city, loc]
  return pool.query(text, values)
}

module.exports = { addVisitor }
