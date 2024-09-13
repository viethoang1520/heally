const express = require("express");
const router = express.Router();
const userController = require("../../app/controllers/userController");

router.get("/", userController.validUser);

module.exports = router;