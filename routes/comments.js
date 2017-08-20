var express = require("express");
//mergeParams merges parameters from comments and hostground together
//so inside comments route we can access the :id
var router = express.Router({mergeParams:true});
var Hostground = require("../models/hostground.js");
var Comment = require("../models/comment.js");
var middleware = require("../middleware");


// Comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
	Hostground.findById(req.params.id, function(err, hostground){
		if(err){
			console.log(err)
		}else{
			res.render("comments/new.ejs", {hostground: hostground});
		}
	});
});

// Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
	//lookup hostground by ID
	Hostground.findById(req.params.id, function(err, hostground){
		if(err){
			console.log(err);
			res.redirect("/hostgrounds");
		} else {
		//create a new comment
		Comment.create(req.body.comment, function(err, comment){
			if(err){
				req.flash("error", "Something went wrong.");
				console.log(err);
			}else{
				//add username and ID to comment
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
				//save comment
				comment.save();
				hostground.comments.push(comment);
				hostground.save();
				console.log(comment);
				req.flash("success", "Successfully added comment.");
				res.redirect("/hostgrounds/" + hostground._id);
			}
		});
		}
	});
});

//Comment Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit.ejs", {hostground_id: req.params.id, comment: foundComment});
		}
	})
	
});

//Comment Update Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/hostgrounds/" + req.params.id )
		}
	})
})

//Comment Delete
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted.");
			res.redirect("/hostgrounds/" + req.params.id)
		}
	})
});


module.exports = router;