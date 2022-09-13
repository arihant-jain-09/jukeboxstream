const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const LocalStrategy = require('passport-local').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Restaurant = mongoose.model('restaurants');

passport.serializeUser((user, done) => {
  return done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((results) => {
      done(null, results);
    })
    .catch((err) => console.log(err));
});

passport.use(
  'Partner',
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/partner/google/callback',
    },
    async (accesstoken, refresh_token, profile, done) => {
      const results = await User.findOne({ googleId: profile.id });
      if (results) done(null, results);
      else {
        const user = await new User({
          googleId: profile.id,
          type: 'Partner',
          displayName: profile.displayName,
          email: profile.emails,
          photo: profile.photos,
        }).save();
        const restaurant = await new Restaurant({
          _id: user._id,
        }).save();
        console.log(restaurant);

        done(null, user);
      }
    }
  )
);

passport.use(
  'Customer',
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/customer/google/callback',
    },
    async (accesstoken, refresh_token, profile, done) => {
      const results = await User.findOne({ googleId: profile.id });
      if (results) done(null, results);
      else {
        const user = await new User({
          googleId: profile.id,
          type: 'Customer',
          displayName: profile.displayName,
          email: profile.emails,
          photo: profile.photos,
        }).save();
        done(null, user);
      }
    }
  )
);
