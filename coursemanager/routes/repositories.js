var express = require('express');
var router = express.Router();
var Repository = require('../models/repository');

router.get('/:id',function(req, res) {
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

module.exports = router;
