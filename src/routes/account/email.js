const express = require("express");
const router = express.Router();

const emailController = require("../../app/controllers/emailController");

router.get("/", emailController.index);
router.post("/sendEmail", emailController.sendEmail);
router.get("/verify", emailController.verify);
router.post("/verify/validate", emailController.validate);

module.exports = router;
