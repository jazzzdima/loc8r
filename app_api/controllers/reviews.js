const mongoose = require('mongoose');
const Location = require('../models/locations');

const sendJsonResponse = (res, status, content) => {
	res.status(status);
	res.json(content);
};

module.exports.reviewsCreate = function(req, res){
	res.status(200);
	res.json({ "status" : "success" });
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