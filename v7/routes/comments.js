var express = require("express");
//mergeParams merges parameters from comments and hostground together
//so inside comments route we can access the :id
var router = express.Router({mergeParams:true});
var Hostground = require("../models/hostground.js");
var Comment = require("../models/comment.js");


// Comments new
router.get("/new", isLoggedIn, function(req, res){
	Hostground.findById(req.params.id, function(err, hostground){
		if(err){
			console.log(err)
		}else{
			res.render("comments/new.ejs", {hostground: hostground});
		}
	});
});

// Comments create
router.post("/", isLoggedIn, function(req, res){
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

//middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;