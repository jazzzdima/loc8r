const mongoose = require('mongoose');
const Location = require('../models/locations');

const sendJsonResponse = (res, status, content) => {
	res.status(status);
	res.json(content);
};

const doAddReview = (req, res, location) => {
	if (!location) {
		sendJsonResponse(res, 404, {
			"message" : "locationId not found"
		});
	} else {
		location.reviews.push({
			author: req.body.author,
			rating: req.body.rating,
			text: req.body.text,
		});
		location.save((err, location) => {
			let thisReview;
			if (err) {
				sendJsonResponse(res, 404, err);
			} else {
				updateAverageRating(location._id);
				thisReview = location.reviews[location.reviews.length-1];
				sendJsonResponse(res, 201, thisReview);
			}
		});
	}
};

const updateAverageRating = locationId => {
	Location.findById(locationId)
		.select('rating reviews')
		.exec((err, location) => {
			if (!err) doSetAverageRating(location);
		});
};

const doSetAverageRating = location => {
	let i, reviewCount, ratingAverage, ratingTotal;
	if (location.reviews && location.reviews.length > 0) {
		reviewCount = location.reviews.length;
		ratingTotal = 0;
		for (i = 0; i < reviewCount; i++) {
			ratingTotal += location.reviews[i].rating;
		}
		ratingAverage = parseInt(ratingTotal/reviewCount, 10);
		location.rating = ratingAverage;
		location.save(err => {
			err ? console.log(err) : console.log('Average rationg update');
		});
	}
};

module.exports.reviewsCreate = function(req, res){
	let locationId = req.params.locationId;
	if (locationId) {
		Location.findById(locationId)
			.select('reviews')
			.exec((err, location) => {
				err ? sendJsonResponse(res, 400, err) :
					doAddReview(req, res, location);
			});
	} else {
		sendJsonResponse(res, 404, {
			"message" : "locationId required"
		});
	}
};

module.exports.reviewsReadOne = function(req, res){
	if (req.params && req.params.locationId && req.params.reviewId) {
		Location.findById(req.params.locationId)
			.select('name reviews')
			.exec((err, location) => {
				if (!location) {
					sendJsonResponse(res, 404, {
						"message" : "Location not found"
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				if (location.reviews && location.reviews.length > 1) {
					let review = location.reviews.id(req.params.reviewId);
					if (!review) {
						sendJsonResponse(res, 404, {
							"message" : "review not found"
						});
					} else {
						let response = {
							location: {
								name: location.name,
								id: req.params.locationId
							},
							review: review
						};
						sendJsonResponse(res, 200, response);
					}
				} else {
					sendJsonResponse(res, 404, {
						"message" : "No reviews found"
					});
				}				
			});	
	} else {
		sendJsonResponse(res, 404, {
			"message" : 
				"Not found, locationid and reviewid are both required"
		});
	}
};

module.exports.reviewsUpdateOne = function(req, res){
	res.status(200);
	res.json({ "status" : "success" });
};

module.exports.reviewsDeleteOne = function(req, res){
	res.status(200);
	res.json({ "status" : "success" });
};