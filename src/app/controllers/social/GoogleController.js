const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/User'); // Replace with your user model
require('dotenv')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
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
      password_hash: '****',
      email: profile.emails[0].value,
      full_name: profile.displayName,
      status: 0,
      provider: 'google'

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
