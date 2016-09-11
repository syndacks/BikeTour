var express = require("express");
var router = express.Router();
var Hostground = require("../models/hostground");


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

// NEW ROUTE
router.get('/new', function(req, res){
	res.render('hostgrounds/new.ejs');
});

//(CREATE) POST ROUTE - show form
router.post("/", function(req, res){
	Hostground.create(req.body.hostground, function(err, newHostGround){
		if(err){
			console.log(err)
		}else{
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
router.get("/:id/edit", function(req, res){
	Hostground.findById(req.params.id, function(err, foundHostground){
		if(err){
			res.redirect("/hostgrounds/:id/show");
		}else{
			res.render("hostgrounds/edit.ejs", {hostground:foundHostground});
		}
	});
});

// UPDATE ROUTE
router.put("/:id", function(req, res){
	//takes three arguments: ID defined by, new Data, and callback
	Hostground.findByIdAndUpdate(req.params.id, req.body.hostground, function(err, updatedHostground){
		if(err){
			res.redirect("/hostgrounds/:id/show");
		} else{
			res.redirect("/hostgrounds/" + req.params.id); 
		}
	});
});

// DESTROY ROUTE
router.delete("/:id", function(req, res){
	//takes two arguments:
	Hostground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect("/hostgrounds/:id");
		}
	});
});

module.exports = router;