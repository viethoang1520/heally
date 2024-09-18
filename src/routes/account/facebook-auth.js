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
      expiresIn: '7d',
    });
    return res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`);
  });

router.get("/failed", (req, res) => {
  res.json({
    success: false,
    message: "failure"
  })
})
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect(process.env.CLIENT_URL)
})

module.exports = router;

