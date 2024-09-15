const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')

router.get('/',
  passport.authenticate('facebook', { scope: ['email'] }));

router.get('/callback',
  passport.authenticate('facebook'),
  (req, res) => {
    // Successful authentication, redirect home.
    const { username, email } = req.user
    const token = jwt.sign({ id: req.user._id, username, email }, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });
    res.json({ "error_code": "0", "message": "success facebook login", token })
  });

router.get('/api/logout', (req, res) => {
  req.logout();
  // res.redirect('/');
});

router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;

