import express, { Router } from "express"
const {
  getVisits,
  addVisit,
  addEvent,
} = require("../controllers/visitController")

const router: Router = express.Router()

router.route("/").get(getVisits)
router.route("/add").get(addVisit)
router.route("/event").post(addEvent)

module.exports = router
