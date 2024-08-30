const express = require("express");
const router = express.Router();
const avatarController = require("../app/controllers/avatarController");

router.get('/', avatarController.getAvatarsByType);
router.post('/', avatarController.createAvatar);

module.exports = router;
