const express = require("express");
const router = express.Router();
const userController = require("../../app/controllers/userController");
const Auth = require('../../middleware/AuthenticateJWT')

router.get("/", userController.getUserByID);
router.get("/valid", Auth, userController.validUser);

module.exports = router;