var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));

//tell express to serve the public directory (with style)
app.use(express.static("public"));

//connect to DB
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on("error", console.log.bind(console, 'connection-error:'));
db.once('open', function(){
	console.log("we are connected!")
});

var hostgroundSchema = mongoose.Schema({
	name: String,
	image: String,
	comment: String
});

var Hostground = mongoose.model("Hostground", hostgroundSchema);

// Hostground.create({
// 	name: "Mark Martin",
// 	image: "http://embassysuites3.hilton.com/resources/media/es/BTRCSES/en_US/img/shared/full_page_image_gallery/main/ES_downtownbatonrouge_18_712x342_FitToBoxSmallDimension_Center.jpg",
// 	comment: "You above water there LSU?"
// }, function(err, hostground){
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log("newly created hostground")
// 		console.log(hostground)
// 	}
// });

Hostground.find({}, function(err, hostgrounds){
	if(err){

		console.log(err)
	} else{
		console.log("all the hostgrounds:")
		console.log(hostgrounds)
	}
});


//------
//ROUTES
//------

//req = request and res = response
app.get('/', function(req, res){
	res.render('home.ejs');
});

// hostgrounds.push(plumcreek);

//INDEX ROUTE
//we are finding all the hostgrounds from mongoDB and showing them
app.get('/hostgrounds', function(req, res){
	Hostground.find({}, function(err, allHostgrounds){
		if(err){
			console.log(err)
		}else{
			res.render('index.ejs', {hostgrounds: allHostgrounds});
		}
	});
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
	Hostground.create(newHostGround, function(err, newHostGround){
		if(err){
			console.log(err)
		}else{
			res.redirect("/hostgrounds");
		}
	});
});

//SHOW ROUTE
app.get("/hostgrounds/:id", function(req, res){
	//find hostground with provided ID
	Hostground.findById(req.params.id, function(err, foundHostground){
		if(err){
			console.log(err);
		} else {
			//render show template with the "foundHostground" as variable "hostground"
			res.render("show.ejs", {hostground: foundHostground});
		}
	});
})
























app.listen(3000, function(){
	console.log('The bikeCamp server has started!');
});