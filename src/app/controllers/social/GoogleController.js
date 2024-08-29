const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../../models/User');
require('dotenv').config()


// Google Strategy configuration
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      console.log('Hello morning');

      let user = await User.findOne({ username: profile.id });

      if (!user) {
        user = new User({
          username: profile.id,
          full_name: profile.displayName,
          password_hash: '***',
          status: 1,
          provider: 'google',
          email: profile.emails[0].value
        });
        await user.save();
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Route handlers
const index = (req, res, next) => {
  console.log('get in google index');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  console.log('success index');
};

const callback = (req, res, next) => {
  console.log('get in google callback');
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/error'
  })(req, res, next);
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = { index, callback };
