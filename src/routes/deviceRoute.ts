import express, { Router } from "express"
const {
  getDevices,
  getDeviceByName,
} = require("../controllers/deviceController")

const router: Router = express.Router()

router.route("/devicesus").get(getDevices)
router.route("/:name").get(getDeviceByName)
module.exports = router
