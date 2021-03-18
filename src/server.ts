import express, { Application, Router } from "express"
const cors = require("cors")
var colors = require("colors")
const morgan = require("morgan")
require("dotenv").config()

let visitorRouter: Router = require("./routes/visitorRoute")

const app: Application = express()

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use("/api", visitorRouter)

app.listen(process.env.PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on Port:${process.env.PORT}`
  )
)
