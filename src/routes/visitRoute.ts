import express, { Router } from "express"
const { getVisits, addVisit } = require("../controllers/visitController")

const router: Router = express.Router()

router.route("/").get(getVisits)
router.route("/add").get(addVisit)

module.exports = router
