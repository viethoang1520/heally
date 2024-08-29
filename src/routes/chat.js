const express = require("express");
const router = express.Router();
const chatController = require("../app/controllers/chat/chatController");

router.post('/', chatController.accessChat);
router.get('/', chatController.fetchAllChats);

module.exports = router;
