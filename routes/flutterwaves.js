const express = require('express')
const router = express.Router()
const { createBillAirtime, createBillData } = require("../controllers/flutterwave.js")


router.post("/airtime", createBillAirtime);
router.post("/data", createBillData);

module.exports = router;