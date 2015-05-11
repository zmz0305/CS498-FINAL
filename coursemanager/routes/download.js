var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', function(req, res){
    console.log(req.query.url);
    request(req.query.url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return res.status(200).json(body);
        }
    })
});

module.exports = router;