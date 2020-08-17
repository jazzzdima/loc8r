const mongoose = require('mongoose');

const openingTimeSchema = new mongoose.Schema({
	days: {type: String, required: true},
	opening: String,
	closing: String,
	closed: {type: Boolean, required: true}
});

const reviewSchema = new mongoose.Schema({
	author: String,
	rating: {
		type: Number,
		'default': 0,
		min: 0,
		max: 5,
		required: true,
	},
	text: String,
	createdOn: {
		type: Date,
		"default": Date.now,
	}
});

const locationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	address: String,
	rating: {
		type: Number,
		'default': 0,
		min: 0,
		max: 5,
	},
	facilities: [String],
	coords: {
		type: [Number],
		index: '2dsphere',
	},
	openingTime: [openingTimeSchema],
	reviews: [reviewSchema],
});

let Location = mongoose.model('Location', locationSchema);

module.exports = Location;
