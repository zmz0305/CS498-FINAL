var express = require('express');
var router = express.Router();
var jsdom = require("jsdom");
var fs = require("fs");
var reversejs = fs.readFileSync("util/reverse.js");

router.get('/:url', function(req, res){
	var url = req.params.url;
	appendCSS(url, function(data){
		res.send(data);
	})
});

function appendCSS(html, cb){
	jsdom.env(html,
		["//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"],
		function(errors, window){
			var temperaryCounter = 0;
			var $ = window.$;
			var finished= function(){
				temperaryCounter -= 1;
				if (temperaryCounter == 0){
					cb("<html>" + $("html").html() + "</html>");
				}
			}
			$('link[rel=stylesheet]').each(function(){
				temperaryCounter += 1;
			    $.get($(this).attr("href")).done((function(data){
			    	var style = $('<style type="text/css"></style>');
			    	style.html(data);
			        $(this).after(style); 
			        $(this).remove(); 
			    }).bind(this)).always(finished);
			});
			$("a").each(function(){
				var newLink = "/api/html/"+window.encodeURI($(this).attr("href"))
				$(this).attr("href", newLink);
			})
		});
}