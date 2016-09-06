var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var seedDB = require("./seeds");
var Hostground = require("./models/hostground.js");
var Comment = require("./models/comment.js");


//connect to DB
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on("error", console.log.bind(console, 'connection-error:'));
db.once('open', function(){
	console.log("we are connected!")
	});

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
//tell express to serve the public directory (with style) (__dirname is the full dir name)
app.use(express.static(__dirname + "/public"));


seedDB();
//------
//ROUTES
//------

//req = request and res = response
app.get('/', function(req, res){
	res.render('landing.ejs');
});

// hostgrounds.push(plumcreek);

//INDEX ROUTE
//we are finding all the hostgrounds from mongoDB and showing them
app.get('/hostgrounds', function(req, res){
	Hostground.find({}, function(err, allHostgrounds){
		if(err){
			console.log(err)
		}else{
			res.render('hostgrounds/index.ejs', {hostgrounds: allHostgrounds});
		}
	});
});

//NEW ROUTE
app.get('/hostgrounds/new', function(req, res){
	res.render('hostgrounds/new.ejs');
});

//(CREATE) POST ROUTE
app.post("/hostgrounds", function(req, res){
	Hostground.create(req.body.hostground, function(err, newHostGround){
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
	//and if we want to pass the comments to the show template need to use .populate and .exec
	Hostground.findById(req.params.id).populate("comments").exec(function(err, foundHostground){
		if(err){
			console.log(err);
		} else {
			console.log(foundHostground);
			//render show template with the "foundHostground" as variable "hostground"
			res.render("hostgrounds/show.ejs", {hostground: foundHostground});
		}
	});
});

//EDIT ROUTE
app.get("/hostgrounds/:id/edit", function(req, res){
	Hostground.findById(req.params.id, function(err, foundHostground){
		if(err){
			res.redirect("/hostgrounds/:id/show");
		}else{
			res.render("hostgrounds/edit.ejs", {hostground:foundHostground});
		}
	});
});

//UPDATE ROUTE
app.put("/hostgrounds/:id", function(req, res){
	//takes three arguments: ID defined by, new Data, and callback
	Hostground.findByIdAndUpdate(req.params.id, req.body.hostground, function(err, updatedHostground){
		if(err){
			res.redirect("/hostgrounds/:id/show");
		} else{
			res.redirect("/hostgrounds/" + req.params.id); 
		}
	});
});

//DESTROY ROUTE
app.delete("/hostgrounds/:id", function(req, res){
	//takes two arguments:
	Hostground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect("/hostgrounds/:id");
		}
	});
});





//===============
//COMMENTS ROUTES
//===============

app.get("/hostgrounds/:id/comments/new", function(req, res){
	Hostground.findById(req.params.id, function(err, hostground){
		if(err){
			console.log(err)
		}else{
			res.render("comments/new.ejs", {hostground: hostground});
		}
	});
});


app.post("/hostgrounds/:id/comments", function(req, res){
	//lookup hostground by ID
	Hostground.findById(req.params.id, function(err, hostground){
		if(err){
			console.log(err);
			res.redirect("/hostgrounds");
		} else {
		//create a new comment
		Comment.create(req.body.comment, function(err, comment){
			if(err){
				console.log(err);
			}else{
				hostground.comments.push(comment);
				hostground.save();
				res.redirect("/hostgrounds/" + hostground._id);
			}
		});
		}
	});
});







app.listen(3000, function(){
	console.log('The bikeCamp server has started!');
});