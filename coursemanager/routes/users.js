var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Repository = require('../models/repository');

/* GET users listing. */

//router.get('/', ensureAuthenticated, function(req, res){
//    User.find({_id: req.user._id}, function(err, user){
//        if(err)
//            res.status(100).send(err);
//        else {
//            return res.status(200).json({
//                message: 'OK',
//                'data': users
//            });
//        }
//    })
//});
//

router.get('/', function(req, res) {
    User.find({},function (err, users) {
        if (err)
            res.status(100).send(err);
        else {
            return res.status(200).json({
                message: "OK",
                "data": users
            });
        }
    });
});

router.post('/', function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.repo_ids = [];

    User.findOne({email: user.email}, function (err, validation) {
        if (validation)
            return res.status(500).json({message: 'This email already exist' + user.email});
        else {
            user.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    return res.status(201).json({
                        message: "User added",
                        data: user
                    });
                }
            });
        }
    });
});


router.options(function(req, res){
    res.writeHead(200);
    res.end();
});


//User/:id
router.get('/:id',function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err)
            res.status(404).json(
                {
                    "status": "error",
                    "data": {},
                    "error": "User not found"
                }
            );
        else if(!user)
            res.status(404).json(
                {
                    "status": "error",
                    "data": {},
                    "error": "User not found"
                }
            );
        else {
            return res.status(200).json(
                {
                    "status": "success",
                    "data": user
                }
            );
        }
    });
});

router.post('/:id', function (req, res) {
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
                User.findByIdAndUpdate(req.params.id, {$push: {repo_ids: repository._id}}, function (err, user) {
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
                User.findByIdAndUpdate(req.params.id, {$pull: {repo_ids: req.body.data.id}}, function (err, user) {
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


    /*
    if (req.body.action == "update_repo") {
        if ((req.body.data.url == undefined || req.body.data.url == "") && (req.body.data.name == undefined || req.body.data.name == "") && (req.body.data.id == undefined || req.body.data.id == "")) {
            return res.status(500).json({
                "status": "error",
                "data": req.body.action.toString(),
                "error": "Validation Error: A repository name is required to update! A repository url is required to update! A repository id is required to update!"
            })
        }

        if ((req.body.data.url == undefined || req.body.data.url == "") && (req.body.data.name == undefined || req.body.data.name == "")) {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A repository url is required to add! A repository name is required to add!"
            })
        }

        if ((req.body.data.url == undefined || req.body.data.url == "" ) && (req.body.data.id == undefined || req.body.data.id == "")) {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A repository url is required to add! A repository id is required to add!"
            })
        }

        if ((req.body.data.name == undefined || req.body.data.name == "") && (req.body.data.id == undefined || req.body.data.id == "")) {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A repository name is required to add! A repository id is required to add!"
            })
        }

        if ((req.body.data.name == undefined || req.body.data.name == "")) {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A repository name is required to add!"
            })
        }

        if ((req.body.data.url == undefined || req.body.data.url == "")) {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A repository url is required to add!"
            })
        }

        if ((req.body.data.id == undefined || req.body.data.id == "")) {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A repository id is required to add!"
            })
        }

        Repository.update({_id: req.body.data.id}, {$set: {}}, function () {

        })
    }
    */
});
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}
module.exports = router;
