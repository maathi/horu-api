const { pool } = require("../config/db")

function getVisitors() {
  return pool.query("SELECT * FROM visitors")
}

module.exports = { getVisitors }
