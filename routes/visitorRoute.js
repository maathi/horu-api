const express = require("express")
const { getVisitors } = require("../controllers/visitorController")

const router = express.Router()

router.route("/").get(getVisitors)

module.exports = router
