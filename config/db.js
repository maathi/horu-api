const { Pool } = require("pg")

let connectionString = process.env.DATABASE_URL || "postgres://horu:@:/horudb"

const pool = new Pool({
  connectionString,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
})

module.exports = { pool }
