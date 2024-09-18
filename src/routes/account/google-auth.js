const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')

router.get('/',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get("/failed", (req, res) => {
  res.json({
    success: false,
    message: "failure"
  })
})
router.get("/success", (req, res) => {
  res.json({
    success: true,
    message: "success",
    user: req.user
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect(process.env.CLIENT_URL)
})
router.get('/callback',
  passport.authenticate('google', {
    // successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/failed'
  }),
  (req, res) => {
    const { username, email } = req.user
    const token = jwt.sign({ id: req.user._id, username, email }, process.env.JWT_SECRET, {
      expiresIn: '20d',
    });
    return res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`);
  });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
