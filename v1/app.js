var express = require("express");
var app = express();

app.get('/', function(req, res){
	res.send("fuck you, world!");
});

app.listen(3000, function(){
	console.log("The bikeCamp server has started!");
});



