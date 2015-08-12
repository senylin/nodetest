var express = require("express");
var cheerio =require("cheerio");
var superagent = require("superagent");

var app = express();

app.get('/',function(req,res,next){
	superagent.get('db.178.com/dota2/hero-38/').end(function(err,sres){
		if(err){
			return next(err);
		}
		var $ = cheerio.load(sres.text);
		var items= [];
		$('.box_b_in').each(function(idx,element){
			var $element = $(element);
			items.push({
				longword:$element.html()
			})
		})
		console.log(items);
		res.send(items);
	})
})

app.listen(3000,function(){
	console.log("begin");
})