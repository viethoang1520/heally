const express = require("express");
const router = express.Router();
const errorController = require("../app/controllers/errorController.js");

router.get("/", errorController.index);

module.exports = router;
