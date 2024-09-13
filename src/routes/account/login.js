const express = require("express");
const router = express.Router();
const loginController = require("../../app/controllers/loginController");

router.post("/validate", loginController.validate);

module.exports = router;
