const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../models/User');
require('dotenv').config()

// Facebook Strategy configuration
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email', 'gender']
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      console.log('Đang ở trong facebookController');

      let user = await User.findOne({ username: profile.id });

      if (!user) {
        user = new User({
          username: profile.id,
          full_name: profile.displayName,
          password_hash: '***',
          status: 1,
          provider: 'facebook',
          email: profile.emails[0].value
        });

        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

// Route handlers
const index = (req, res, next) => {
  passport.authenticate('facebook', { scope: 'email' })(req, res, next);
};

const callback = (req, res, next) => {
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/error' })(req, res, next);
};

module.exports = { index, callback };
