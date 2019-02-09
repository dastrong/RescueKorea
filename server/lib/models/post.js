const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	petName: {
		type: String,
		required: [true, "Pet Name Required"],
	},
	type: {
		type: String,
		required: [true, "Animal Type Required"],
	},
	location: {
		type: String,
		required: [true, "Location Required"],
	},
	description: {
		type: String,
		required: [true, "Description Required"],
	},
	breed: {
		type: String,
		required: [true, "Breed Required"],
	},
	gender: {
		type: String,
		required: [true, "Gender Required"],
	},
	size: {
		type: String,
		required: [true, "Size Required"],
	},
	color: {
		type: String,
		required: [true, "Color Required"],
	},
	owner: {
		id: {
			type: String,
			required: [true, "Owner ID Required"],
		},
		name: {
			type: String,
			required: [true, "Owner Name Required"],
		},
		email: {
			type: String,
			required: [true, "Owner Email Required"],
		},
	},
	age: {
		type: String,
		required: [true, "Age Required"],
	},
	adoptionFee: {
		type: Number,
		required: [true, "Adoption Fee Required"],
	},
	spayed: Boolean,
	vaccinated: Boolean,
	goodWith: [String],
	trained: [String],
	images: [{ type: Object, required: [true, "Minimum 1 Image Required"] }],
	// post expires after 90 days
	createdAt: {
		type: Date,
		expires: 7776000,
		default: Date.now,
	},
});

module.exports = mongoose.model("Post", PostSchema);
