const http = require("http")

const requestListener = function (req, res) {
  res.writeHead(200)
  let referer = req.headers.referer
  let ip = req.connection.remoteAddress

  res.end(ip + referer)
}

const server = http.createServer(requestListener)
server.listen(process.env.PORT || 8080)
