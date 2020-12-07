const express = require("express");

const { sendFeedback } = require("../controller/appController.js");

const router = express.Router();

router.post("/sendFeedBack", sendFeedback);

router.get("/", (req, res) => {
    res.render('index');
  });

module.exports = router;