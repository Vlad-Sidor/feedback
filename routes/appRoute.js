const express = require("express");

const { sendFeedback } = require("../controller/appController.js");

const router = express.Router();

router.post("/sendFeedBack", sendFeedback);

router.get("/", (req, res) => {
    res.status(200).send("WHATABYTE: Food For Devs");
  });

module.exports = router;