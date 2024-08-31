const express = require("express");
const router = express.Router();
const avatarController = require("../app/controllers/avatarController");

router.get('/', avatarController.getAvatarsByType);
router.get('/type', avatarController.getAvatarTypes);
router.post('/', avatarController.createAvatar);

module.exports = router;
