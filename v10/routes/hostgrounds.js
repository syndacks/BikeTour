var express = require("express");
var router = express.Router();
var Hostground = require("../models/hostground");
//will automatically acquire 'index.js' inside middlware
var middleware = require("../middleware");


// INDEX ROUTE
//we are finding all the hostgrounds from mongoDB and showing them
router.get('/', function(req, res){
	Hostground.find({}, function(err, allHostgrounds){
		if(err){
			console.log(err)
		}else{
			res.render('hostgrounds/index.ejs', {hostgrounds: allHostgrounds, currentUser: req.user});
		}
	});
});

// NEW ROUTE - show form
router.get('/new', middleware.isLoggedIn, function(req, res){
	res.render('hostgrounds/new.ejs');
});

//(CREATE) POST ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	//this isn't working because I changed the data structure from a variable to an object
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newHostGround = {name: name, image: image, description: description, author: author};
	Hostground.create(newHostGround, function(err, newlyCreated){
		if(err){
			console.log(err)
		}else{
			console.log(newlyCreated);
			res.redirect("/hostgrounds");
		}
	});
});

// SHOW ROUTE
router.get("/:id", function(req, res){
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

// EDIT ROUTE
router.get("/:id/edit", middleware.checkHostgroundOwnership, function(req, res){
	Hostground.findById(req.params.id, function(err, foundHostground){
		res.render("hostgrounds/edit.ejs", {hostground:foundHostground});
	});
});

// UPDATE ROUTE
router.put("/:id", middleware.checkHostgroundOwnership, function(req, res){
	//takes three arguments: ID defined by, new Data, and callback
	Hostground.findByIdAndUpdate(req.params.id, req.body.hostground, function(err, updatedHostground){
		if(err){
			res.redirect("/hostgrounds");
		} else{
			res.redirect("/hostgrounds/" + req.params.id); 
		}
	});
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkHostgroundOwnership, function(req, res){
	//takes two arguments:
	Hostground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect("/hostgrounds");
		}
	});
});



module.exports = router;