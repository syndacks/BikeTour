var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// root route
router.get('/', function(req, res){
	res.render('landing.ejs');
});

// show register form
router.get("/register", function(req, res){
	res.render("register.ejs");
})

// handle register logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			// req.flash("error", err.message);
			return res.render("register.ejs", {error: err.message});
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to BikeTour " + user.username);
			res.redirect("/hostgrounds");
		});
	});
});

// show login form
router.get("/login", function(req, res){
	res.render("login.ejs");
});

// handle login logic
router.post("/login", passport.authenticate("local",
	{
		successRedirect:"/hostgrounds",
		failureRedirect:"/login"
	}), function(req, res){
});

// add logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out.");
	res.redirect("/hostgrounds");
});


module.exports = router;