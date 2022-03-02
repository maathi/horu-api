import express, { Router } from "express"
const {
  getVisits,
  addVisit,
  addEvent,
} = require("../controllers/visitController")

const router: Router = express.Router()

router.route("/visitus").get(getVisits)
router.route("/home").post(addVisit)
router.route("/eventus").post(addEvent)

module.exports = router
