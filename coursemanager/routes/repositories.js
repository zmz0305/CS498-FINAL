var express = require('express');
var router = express.Router();
var Repository = require('../models/repository');
var Content = require('../models/content');

router.get('/', function(req, res) {
    Repository.find({},function (err, repositories) {
        if (err)
            res.status(100).send(err);
        else {
            return res.status(200).json({
                message: "OK",
                "data": repositories
            });
        }
    });
});

router.get('/:id',function (req, res) {
    Repository.findById(req.params.id, function(err, repository) {
        if (err)
            res.status(404).json(
                {
                    "status": "error",
                    "data": {},
                    "error": "Repository not found"
                }
            );
        else if(!repository)
            res.status(404).json(
                {
                    "status": "error",
                    "data": {},
                    "error": "Repository not found"
                }
            );
        else {
            return res.status(200).json(
                {
                    "status": "success",
                    "data": repository
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

    if (req.body.action == "add_content") {
        if ((req.body.data.url == undefined || req.body.data.url == "") && (req.body.data.name == undefined || req.body.data.name == "") && (req.body.data.position == undefined || req.body.data.position == "")) {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A content name is required to add! A content url is required to add! A content position is required to add!"
            })
        }

        if ((req.body.data.url == undefined || req.body.data.url == "") && (req.body.data.name == undefined || req.body.data.name == "")) {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A content name is required to add! A content url is required to add!"
            })
        }

        if ((req.body.data.url == undefined || req.body.data.url == "") && (req.body.data.position == undefined || req.body.data.position == "")) {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A content name is required to add! A content position is required to add!"
            })
        }

        if ((req.body.data.position == undefined || req.body.data.position == "") && (req.body.data.name == undefined || req.body.data.name == "")) {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A content name is required to add! A content position is required to add!"
            })
        }

        if (req.body.data.url == undefined || req.body.data.url == "") {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A content url is required to add!"
            })
        }

        if (req.body.data.name == undefined || req.body.data.name == "") {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A content name is required to add!"
            })
        }

        if (req.body.data.position == undefined || req.body.data.position == "") {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A content position is required to add!"
            })
        }

        var content = new Content();
        content.name = req.body.data.name;
        content.url = req.body.data.url;
        content.position = req.body.data.position;

        content.save(function (err) {
            if (err)
                return res.status(500).send(err);
            else {
                Repository.findByIdAndUpdate(req.params.id, {$push: {contents: content._id}}, function (err, repository) {
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
                    else
                        return res.status(201).json({
                            "status": "add_content success",
                            "data": {
                                "id" : repository.id,
                                "url" : repository.url,
                                "name" : repository.name,
                                "contents" : repository.contents
                            }
                        });
                });
            }
        });
    }

    if (req.body.action == "delete_content") {
        if (req.body.data.id == undefined || req.body.data.id == "") {
            return res.status(500).json({
                "status": "error",
                "data": {},
                "error": "Validation Error: A content id is required to delete!"
            })
        }

        Content.remove({_id: req.body.data.id}, function (err, repository) {
            if (err)
                res.status(404).json(
                    {
                        "status": "error",
                        "data": {},
                        "error": "Content not found"
                    }
                );
            else if (!repository)
                res.status(404).json(
                    {
                        "status": "error",
                        "data": {},
                        "error": "Content not found"
                    }
                );
            else {
                Repository.findByIdAndUpdate(req.params.id, {$pull: {contents: req.body.data.id}}, function (err, repository) {
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
                        return res.status(201).json({
                            "status": "delete_content success",
                            "data": {
                                "id": req.body.data.id,
                                "name": repository.name,
                                "url": repository.url,
                                "contents": repository.contents
                            }
                        });
                    }
                })
            }
        })
    }
})



module.exports = router;
