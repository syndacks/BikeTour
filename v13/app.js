var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var seedDB = require("./seeds");
var Hostground = require("./models/hostground.js");
var Comment = require("./models/comment.js");
var User = require("./models/user.js");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var flash = require("connect-flash");

//requiring routes
var commentRoutes = require("./routes/comments.js");
var hostgroundRotes = require("./routes/hostgrounds.js");
var indexRoutes = require("./routes/index.js");

//connect to DB

//When Deploying, uncomment next line:
mongoose.connect(process.env.DATABASEURL);

// LOCAL HOST:
// mongoose.connect("mongodb://localhost/test");
// MONGOLAB URL:
mongoose.connect("mongodb://dacksmdm:password@ds035836.mlab.com:35836/bikecamp");

var db = mongoose.connection;
db.on("error", console.log.bind(console, 'connection-error:'));
db.once('open', function(){
	console.log("we are connected!")
	});


app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
//tell express to serve the public directory (with style) (__dirname is the full dir name)
app.use(express.static(__dirname + "/public"));
app.use(flash());

// seedDB();

//Passport configuration
app.use(require("express-session")({
	secret: "sometimesthepriceyoupay",
	resave: false,
	saveUninitialize: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//make our own middleware that adds: {currentUser: req.user} to all routes/templates
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	//if there's anything in the flash, we will have access to it under "error" or "success"
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

//next 3 lines: use of Express router where we require route files
app.use("/", indexRoutes);
//make all "hostgrounds" start with /hostgrounds
app.use("/hostgrounds", hostgroundRotes);
app.use("/hostgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT || 3000, function(){
	console.log('The bikeCamp server has started!');
});