const express = require("express");
const router = express.Router();
const starController = require("../../app/controllers/chat/starController");

router.get("/", starController.getUserStar);
router.post("/rate", starController.ratePartner);

module.exports = router;