var express = require('express')
    , passport = require('passport')
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    , mongoose = require('mongoose')
    , User = require('../models/user')
    , findOneOrCreate = require('mongoose-find-one-or-create');
var router = express.Router();
//User.plugin(findOneOrCreate);
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
        callbackURL: "http://localhost:4000/api/login/auth/google/return"
    },
    function(token, tokenSecret, profile, done) {
        var email = "";
        for(var i = 0; i < profile.emails.length; i++){
            if(profile.emails[i].type == "account"){
                email = profile.emails[i].value;
                break;
            }
        }
        User.findOneOrCreate({email: email}, {name: profile.displayName, email: email}, function (err, user) {
            return done(err, user);
        });
        console.log("token: ")
        console.log(token);
        console.log("profile: ")
        console.log(profile);
        console.log("email:");
        console.log(profile.emails);
        //return done(null, profile);
    }
));

router.get('/', function(req, res){
    res.send({user: req.user});
});


router.get('/auth/google',
    passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.profile.emails.read' }),
    function(req, res) {
        res.redirect('/');
    });

router.get('/auth/google/return',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.send(req.user);
    });


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}
module.exports = router;

