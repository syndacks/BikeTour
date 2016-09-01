var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

//tell express to serve the public directory (with style)
app.use(express.static("public"));

//------
//ROUTES
//------


//req = request and res = response
app.get('/', function(req, res){
	res.render('home.ejs');
});

var hostgrounds = [
	{name: "Plum Park", image: "http://i.cbc.ca/1.3023380.1428417797!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/camping-tent-and-canoe.jpg"},
	{name: "Navasota RV", image: "http://bicycletimesmag.com/wp-content/uploads/2015/03/bicycle-times-cycles-j-bryant-nfd-8.jpg"},
	{name: "Shephard Sanctuary", image: "https://farm4.staticflickr.com/3112/3239484201_24567490da.jpg"},
	{name: "Shephard Sanctuary", image: "https://farm4.staticflickr.com/3112/3239484201_24567490da.jpg"},
	{name: "Shephard Sanctuary", image: "https://farm4.staticflickr.com/3112/3239484201_24567490da.jpg"},
	{name: "Plum Park", image: "http://i.cbc.ca/1.3023380.1428417797!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/camping-tent-and-canoe.jpg"},
	{name: "Navasota RV", image: "http://bicycletimesmag.com/wp-content/uploads/2015/03/bicycle-times-cycles-j-bryant-nfd-8.jpg"},
	{name: "Shephard Sanctuary", image: "https://farm4.staticflickr.com/3112/3239484201_24567490da.jpg"},
	{name: "Shephard Sanctuary", image: "https://farm4.staticflickr.com/3112/3239484201_24567490da.jpg"}
]

//INDEX ROUTE
app.get('/hostgrounds', function(req, res){
	res.render('hostgrounds.ejs', {hostgrounds: hostgrounds})
});

//NEW ROUTE
app.get('/hostgrounds/new', function(req, res){
	res.render('new.ejs');
});

//POST ROUTE
app.post("/hostgrounds", function(req, res){
	var hostName = req.body.hostName;
	var hostImage = req.body.hostImage;
	var newHostGround = {name: hostName, image: hostImage};
	hostgrounds.push(newHostGround);
	res.redirect("/hostgrounds");
});

























app.listen(3000, function(){
	console.log('The bikeCamp server has started!');
});