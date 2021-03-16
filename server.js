const http = require("http")

const requestListener = function (req, res) {
  res.writeHead(200)
  let referer = req.headers.referer
  let ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
  ip = ip.replace(/^.*:/, "")

  res.end("ip : " + ip + "  referer : " + referer)
}

const server = http.createServer(requestListener)
server.listen(process.env.PORT || 8080)
