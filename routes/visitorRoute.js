const express = require("express")
const { getVisitors, addVisitor } = require("../controllers/visitorController")

const router = express.Router()

router.route("/").get(getVisitors)
router.route("/add").get(addVisitor)

module.exports = router
