var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */

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

router.post(function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.repo_ids = req.body.repo_ids;

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

module.exports = router;
