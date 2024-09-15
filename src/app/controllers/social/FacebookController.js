const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../models/User'); // Replace with your user model
require('dotenv')

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name']
},
  async (accessToken, refreshToken, profile, done) => {
    // Check if user already exists in our db
    const existingUser = await User.findOne({ username: profile.id });
    if (existingUser) {
      // User exists, return user
      return done(null, existingUser);
    }
    // User does not exist, create a new user
    const newUser = await new User({
      username: profile.id,
      password_hash: '******',
      email: profile.emails[0].value,
      full_name: profile.displayName,
      provider: 'facebook',
      status: 0
    }).save();
    done(null, newUser);
  }));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
