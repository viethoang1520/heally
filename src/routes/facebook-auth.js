const express = require("express");
const router = express.Router();
const { index, callback } = require('../app/controllers/social/FacebookController');

router.get('/', index); 
router.get('/callback', callback);

module.exports = router;
