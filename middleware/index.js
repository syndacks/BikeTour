var Hostground = require("../models/hostground");
var Comment = require("../models/comment");
//all the middleware goes here

var middlewareObj = {};

middlewareObj.checkHostgroundOwnership = function (req, res, next) {
	if(req.isAuthenticated()){
		Hostground.findById(req.params.id, function(err, foundHostground){
			if(err){
				req.flash("error", "Hostground not found.");
				res.redirect("back");
			} else {
				//does the user own the hostground?
				if(foundHostground.author.id.equals(req.user._id)){
					next();
				} else{
					req.flash("error", "You don't have permission to do that.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("back");
		}
};

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			}else{
				//does the user own the comment?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else{
					req.flash("error", "You don't have permission to do that.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("back");
	}
};


middlewareObj.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
	//need to put this line in before you redirect
	req.flash("error", "You need to be logged in to do that.");
	res.redirect("/login");
	}
};


module.exports = middlewareObj;