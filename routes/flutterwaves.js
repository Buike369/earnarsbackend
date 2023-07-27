const express = require('express')
const router = express.Router()
const { createBillAirtime, createBillData } = require("../controllers/flutterwave.js")


router.post("/buyAirtime", createBillAirtime );
router.post("/buyData", createBillData);

module.exports = router;