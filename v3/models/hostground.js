var mongoose = require("mongoose");

var hostgroundSchema = mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

var Hostground = mongoose.model("Hostground", hostgroundSchema);

module.exports = Hostground;