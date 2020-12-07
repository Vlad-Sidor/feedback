const express = require("express");

const { sendFeedback } = require("../controller/appController.js");

const router = express.Router();

router.post("/feeadback/sendFeedBack", sendFeedback);

module.exports = router;