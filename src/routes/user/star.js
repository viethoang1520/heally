const express = require("express");
const router = express.Router();
const Auth = require('../../middleware/AuthenticateJWT')
const starController = require("../../app/controllers/chat/starController");

router.get("/", Auth, starController.getUserStar);
router.post("/rate", Auth, starController.ratePartner);

module.exports = router;