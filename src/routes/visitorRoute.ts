import express, { Router } from "express"
const { getVisitors, addVisitor } = require("../controllers/visitorController")

const router: Router = express.Router()

router.route("/").get(getVisitors)
router.route("/add").get(addVisitor)

module.exports = router
