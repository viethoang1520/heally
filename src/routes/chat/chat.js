const express = require("express");
const router = express.Router();
const authenticateJWT = require('../../middleware/AuthenticateJWT')
const chatController = require("../../app/controllers/chat/chatController");

router.get('/', authenticateJWT, chatController.fetchAllChats);
router.post('/addFriend', chatController.accessChat);

module.exports = router;
