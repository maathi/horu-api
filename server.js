const express = require("express")
const cors = require("cors")
const axios = require("axios")
var colors = require("colors")
const morgan = require("morgan")
require("dotenv").config()

let visitorRouter = require("./routes/visitorRoute")

const app = express()
app.use(express.json())
app.use(cors())
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use("/api", visitorRouter)

app.listen(
  process.env.PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on Port:${process.env.PORT}`
      .green
  )
)

// const requestListener = async function (req, res) {
//   if (req.url === "/favicon.ico") {
//     res.writeHead(200, { "Content-Type": "image/x-icon" })
//     res.end()
//     return
//   }

//   res.writeHead(200)
//   let referer = req.headers.referer
//   let userAgent = req.headers["user-agent"]
//   let ip =
//     req.headers["x-forwarded-for"] ||
//     req.connection.remoteAddress ||
//     req.socket.remoteAddress ||
//     req.connection.socket.remoteAddress
//   ip = ip.replace(/^.*:/, "")

//   if (process.env.NODE_ENV === "development") {
//     ip = ""
//   }

//   getVisitors().then((res) => console.log(res.rows))
//   try {
//     let { data } = await axios.get(
//       `${process.env.URL}/${ip}?token=${process.env.TOKEN}`
//     )
//     addVisitor({ referer, userAgent, ip, ...data })
//       .then((res) => console.log(res.rows[0]))
//       .catch((err) => console.log(err))
//   } catch (err) {
//     console.log(err)
//   }

//   console.log("**********")
//   res.end()
// }

// const server = http.createServer(requestListener)
// server.listen(process.env.PORT || 8080)
