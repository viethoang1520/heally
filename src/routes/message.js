const express = require("express");
const router = express.Router();
const messageController = require("../app/controllers/chat/messageController");
const messageFilter = require('../middleware/MessageFilter')

router.post("/", messageController.sendMessage);
router.get("/", messageController.getMessages);

module.exports = router;