const express = require("express");

const { sendFeedback } = require("../controllers/palitraController.js");
const { sendCredentials } = require("../controllers/weldingController.js");

const router = express.Router();

router.post("/sendFeedBack", sendFeedback);
router.post("/sendCredentials", sendCredentials);

router.get("/", (req, res) => {
    res.render('index');
  });

module.exports = router;