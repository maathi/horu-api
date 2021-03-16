const http = require("http")
require("dotenv").config()
const axios = require("axios")
let { getVisitors } = require("./sql/query")
const requestListener = async function (req, res) {
  res.writeHead(200)
  let referer = req.headers.referer
  let userAgent = req.headers["user-agent"]
  let ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress

  ip = ip.replace(/^.*:/, "")

  if (process.env.ENVIRONNEMENT === "dev") {
    ip = ""
  }

  getVisitors().then((res) => console.log(res.rows[0]))
  // try {
  //   let { data } = await axios.get(
  //     `${process.env.URL}/${ip}?token=${process.env.TOKEN}`
  //   )
  // } catch (err) {
  //   console.log(err)
  // }
  console.log("**********")
}

const server = http.createServer(requestListener)
server.listen(process.env.PORT || 8080)
