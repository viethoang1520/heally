const express = require("express");
const router = express.Router();
const messageController = require("../../app/controllers/chat/messageController");
const Auth = require('../../middleware/AuthenticateJWT')

router.post("/", Auth, messageController.sendMessage);
router.get("/", Auth, messageController.getMessages);

module.exports = router;