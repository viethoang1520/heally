const express = require("express");
const router = express.Router();
const Auth = require('../../middleware/AuthenticateJWT')
const avatarController = require("../../app/controllers/avatarController");

router.get('/', Auth, avatarController.getAvatarsByType);
router.post('/', Auth, avatarController.createAvatar);
router.get('/type', avatarController.getAvatarTypes);

module.exports = router;
