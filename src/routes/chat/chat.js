const express = require("express");
const router = express.Router();
const chatController = require("../../app/controllers/chat/chatController");
const Auth = require('../../middleware/AuthenticateJWT')

router.get('/', Auth, chatController.fetchAllChats);
router.post('/addFriend', Auth, chatController.accessChat);

module.exports = router;
