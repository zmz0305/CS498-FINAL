var express = require('express')
	, passport = require('passport')
	, GoogleStragety = require('passport-google-oauth').OAuth2Strategy
	, mongoose = require('mongoose')
  , User = require('../models/user')
var router = express.Router();

var GOOGLE_CLIENT_ID = '84495535310-0qhsb2ogf9316dv35rhl6f4ap773uq4h.apps.googleusercontent.com'
  , GOOGLE_CLIENT_SECRET = 'tR8P0lvfM_1LSHfVT9asQ2PG';
  
passport.serializeUser(function(user, done) {
	 done(null, user);
});

passport.deserializeUser(function(obj, done) {
	 done(null, obj);
});


passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/return"
    },
    function(token, tokenSecret, profile, done) {
//    User.findOrCreate({ googleId: profile.id }, function (err, user) {
//      return done(err, user);
//    });
        User.
      console.log("token: ")
      console.log(token);
      console.log("profile: ")
      console.log(profile);
      return done(null, profile);
  }
));