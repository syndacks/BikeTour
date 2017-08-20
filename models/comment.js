var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
	text: String,
	// to have the author's name automatically be filled out in the comment form,
	//we change author from "String" to the object (an ID (which takes type and ref) and username) below
	// we could only do something like this (Store date in the comment) with a non relational DB
	author: {
		id: {
			//we did this in the Hostground model (...Types.ObjectId)
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;