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
        callbackURL: "http://localhost:4000/api/user/auth/google/return"
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


router.get('/', ensureAuthenticated, function(req, res){
    //console.log(req);
    User.find({_id: req.user._id}, function(err, user){
        if(err)
            res.status(100).send(err);
        else {
            return res.status(200).json({
                message: 'OK',
                'data': user[0]
            });
        }
    })
});

router.post('/', function (req, res) {
    if (req.body.action == "undefined" || req.body.action == "") {
        return res.status(500).json({
            "status": "error",
            "data": {},
            "error": "Validation Error: An action name is required"
        })
    }

    else if (req.body.action == "add_repo") {
        if ((req.body.data.url == undefined || req.body.data.url == "") && (req.body.data.name == undefined || req.body.data.name == "")) {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A repository name is required to add! A repository url is required to add!"
            })
        }

        if (req.body.data.url == undefined || req.body.data.url == "") {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A repository url is required to add!"
            })
        }

        if (req.body.data.name == undefined || req.body.data.name == "") {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A repository name is required to add!"
            })
        }

        var repository = new Repository();
        repository.name = req.body.data.name;
        repository.url = req.body.data.url;

        repository.save(function (err) {
            if (err)
                return res.status(500).send(err);
            else {
                User.findByIdAndUpdate(req.user._id, {$push: {repo_ids: repository._id}}, function (err, user) {
                    if (err)
                        res.status(404).json(
                            {
                                "status": "error",
                                "data": {},
                                "error": "User not found"
                            }
                        );
                    else if (!user)
                        res.status(404).json(
                            {
                                "status": "error",
                                "data": {},
                                "error": "User not found"
                            }
                        );
                    else {
                        return res.status(201).json({
                            "status": "add_repo success",
                            "data": {
                                "email": user.email,
                                "name": user.name,
                                "repo_ids": user.repo_ids
                            }
                        });
                    }
                });
            }
        });
    }

    else if (req.body.action == "delete_repo") {
        if (req.body.data.id == undefined || req.body.data.id == "") {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A repository id is required to delete!"
            })
        }

        Repository.remove({_id: req.body.data.id}, function (err, repository) {
            if (err)
                res.status(404).json(
                    {
                        "status": "error",
                        "data": {},
                        "error": "Repository not found"
                    }
                );
            else if (!repository)
                res.status(404).json(
                    {
                        "status": "error",
                        "data": {},
                        "error": "Repository not found"
                    }
                );
            else {
                User.findByIdAndUpdate(req.user._id, {$pull: {repo_ids: req.body.data.id}}, function (err, user) {
                    if (err)
                        res.status(404).json(
                            {
                                "status": "error",
                                "data": {},
                                "error": "User not found"
                            }
                        );
                    else if (!user)
                        res.status(404).json(
                            {
                                "status": "error",
                                "data": {},
                                "error": "User not found"
                            }
                        );
                    else {
                        return res.status(201).json({
                            "status": "delete_repo success",
                            "data": {
                                "email": user.email,
                                "name": user.name,
                                "repo_ids": user.repo_ids
                            }
                        });
                    }
                })
            }
        })
    }

    else {
        return res.status(500).json({
            "status": "error",
            "data": {},
            "error": "Validation Error: The action name is invalid"
        })
    }

});

router.get('/auth/google',
    passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.profile.emails.read' }),
    function(req, res) {
        //res.redirect('/public');
    });

router.get('/auth/google/return',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/public');
    });


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('user/auth/google')
}
module.exports = router;

