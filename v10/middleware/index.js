var Hostground = require("../models/hostground");
var Comment = require("../models/comment");
//all the middleware goes here

var middlewareObj = {};

middlewareObj.checkHostgroundOwnership = function (req, res, next) {
	if(req.isAuthenticated()){
		Hostground.findById(req.params.id, function(err, foundHostground){
			if(err){
				res.redirect("back");
			} else {
				//does the user own the hostground?
				if(foundHostground.author.id.equals(req.user._id)){
					next();
				} else{
					res.redirect("back");
				}
			}
		});
	} else {
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
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
};


middlewareObj.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
	res.redirect("/login");
	}
};


module.exports = middlewareObj;