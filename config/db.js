const { Pool } = require("pg")

console.log(process.env.DB_URI)
const pool = new Pool({
  connectionString: process.env.DB_URI,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
})

module.exports = { pool }
