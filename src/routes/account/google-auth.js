const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')

router.get('/',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const { username, email } = req.user
    const token = jwt.sign({ id: req.user._id, username, email }, process.env.JWT_SECRET, {
      expiresIn: '20d',
    });
    res.json({ "error_code": "0", "message": "success facebook login", token })
    // res.json({"message": "successful google authentication"})
  });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
