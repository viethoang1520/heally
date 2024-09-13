const express = require("express");
const router = express.Router();
const { index, callback } = require('../../app/controllers/social/GoogleController');

router.get('/', index);
router.get('/callback', callback);

module.exports = router;