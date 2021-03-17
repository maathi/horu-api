const { pool } = require("../config/db")

async function getVisitors(req, res) {
  let { rows } = await pool.query("SELECT * FROM visitors")

  res.json(rows)
}

module.exports = { getVisitors }
