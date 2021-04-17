import express, { Router } from "express"
const { getDevices } = require("../controllers/deviceController")

const router: Router = express.Router()

router.route("/devices").get(getDevices)

module.exports = router
