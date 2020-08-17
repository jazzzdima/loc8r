const mongoose = require('mongoose');
const Location = require('../models/locations');

const sendJsonResponse = (res, status, content) => {
	res.status(status);
	res.json(content);
};

module.exports.locationsListByDistance = function(req, res){
	let lng = parseFloat(req.query.lng);
	let lat = parseFloat(req.query.lat);
	let maxDistance;

	if (req.query.maxDistance) {
		maxDistance = parseFloat(req.query.maxDistance);
	} else {
		maxDistance = 2000;
	}		
	
	let point = {
		type: "Point",
		coordinates: [lng, lat]
	};
	if (!lng || !lat) {
		sendJsonResponse(res, 404, 
			{ "message" : "lng and lat query parameter are required" });
		return;
	}
	Location.aggregate([
		{
			$geoNear: {
				near: point,
				distanceField: 'distance',
				maxDistance: maxDistance,
				spherical: true,				
			}
		},	
	]).then(result => {
		if (result.length < 1) {
			sendJsonResponse(res, 404, 
				{"message" : "No location found near"});
			return;
		} else {
			sendJsonResponse(res, 200, result);
		}		
	}).catch(err => {
		sendJsonResponse(res, 404, {"message" : "Error"});
		return;
	});
};

module.exports.locationsCreate = function(req, res){
	let location = new Location({
		name: req.body.name,
		address: req.body.address,
		facilities: req.body.facilities.split(","),
		coords: [parseFloat(req.body.lng),parseFloat(req.body.lat)],
		openingTimes: [{
			days: req.body.days1,
			opening: req.body.opening1,
			closing: req.body.closing1,
			closed: req.body.closed1,
		},
		{
			days: req.body.days2,
			opening: req.body.opening2,
			closing: req.body.closing2,
			closed: req.body.closed2,
		},
		{
			days: req.body.days3,
			opening: req.body.opening3,
			closing: req.body.closing3,
			closed: req.body.closed3,
		}],
	});

	location.save((err, location) => {
		if (err) { sendJsonResponse(res, 400, err) }
		else { sendJsonResponse(res, 201, location) }
	});
};

module.exports.locationsReadOne = function(req, res){
	if (req.params && req.params.locationId) {
		Location.findById(req.params.locationId)
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
				sendJsonResponse(res, 200, location);
			});	
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No location in request"
		});
	}	
};

module.exports.locationsUpdateOne = function(req, res){
	if (!req.params.locationId) {
		sendJsonResponse(res, 404, {"message":"locationId is required"});
		return;
	}
	Location
		.findById(req.params.locationId)
		.select('-reviews -rating')
		.exec((err, location) => {
			if (!location) {
				sendJsonResponse(res, 404, {
					"message" : "Location not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 400, err);
				return;
			}
			location.name = 
				req.body.name ? req.body.name : location.name;
			location.address = 
				req.body.address ? req.body.address: location.address;
			location.facilities = 
				req.body.facilities ? req.body.facilities.split(",") :
					location.facilities;
			location.coords = [
				req.body.lng ? 
					parseFloat(req.body.lng) : location.coords[0],
				req.body.lat ? 
					parseFloat(req.body.lat) : location.coords[1]
			];
			location.openingTimes = [{
				days: req.body.days1,
				opening: req.body.opening1,
				closing: req.body.closing1,
				closed: req.body.closed1,
			},
			{
				days: req.body.days2,
				opening: req.body.opening2,
				closing: req.body.closing2,
				closed: req.body.closed2,
			},
			{
				days: req.body.days3,
				opening: req.body.opening3,
				closing: req.body.closing3,
				closed: req.body.closed3,
			}];
			location.save((err, location) => {
				err ? sendJsonResponse(res, 404, err) : 
					sendJsonResponse(res, 200, location);
			});
		});
};

module.exports.locationsDeleteOne = function(req, res){
	let locationId = req.params.locationId;
	if (locationId) {
		Location
			.findByIdAndRemove(locationId)
			.exec((err, location) => {
				if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 204, {
					"message" : "Delete location success"
				});
			});
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No locationId"
		});
	}
};