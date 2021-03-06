var mongoose = require("mongoose");

var hostgroundSchema = mongoose.Schema({
	name: String,
	image: String,
	description: String,
	latitude: Number,
	longitude: Number,
	journal: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

var Hostground = mongoose.model("Hostground", hostgroundSchema);

module.exports = Hostground;