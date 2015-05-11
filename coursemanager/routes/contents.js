var express = require('express');
var router = express.Router();
var Content = require('../models/content');

/* GET contents listing. */

router.get('/', function(req, res) {
    Content.find({},function (err, contents) {
        if (err)
            res.status(100).send(err);
        else {
            return res.status(200).json({
                message: "OK",
                "data": contents
            });
        }
    });
});

router.get('/:id', function(req, res) {
    Content.findById(req.params.id, function (err, content) {
        if (err)
            res.status(404).json(
                {
                    "status": "error",
                    "data": {},
                    "error": "Content not found"
                }
            );
        else if(!content)
            res.status(404).json(
                {
                    "status": "error",
                    "data": {},
                    "error": "Content not found"
                }
            );
        else {
            return res.status(200).json({
                "status" : "success",
                "data" : {
                    id: content._id,
                    url: content.url,
                    name: content.name,
                    position: content.position
                }
            });
        }
    });
});

module.exports = router;