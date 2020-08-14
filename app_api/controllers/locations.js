const mongoose = require('mongoose');
const Location = require('../models/locations');

/*const theEarth = (function() {
	earthRadius = 6371;
	let getDistanceFromRads = rads => {
		return parseFloat(rads * earthRadius);
	};
	let getRadsFromDistance = distance => {
		return parseFloat(distance/earthRadius);
	};
	return {
		getDistanceFromRads : getDistanceFromRads,
		getRadsFromDistance : getRadsFromDistance,
	};
})();*/

const sendJsonResponse = (res, status, content) => {
	res.status(status);
	res.json(content);
};

module.exports.locationsListByDistance = function(req, res){
	let lng = parseFloat(req.query.lng);
	let lat = parseFloat(req.query.lat);
	let point = {
		type: "Point",
		coordinates: [lng, lat]
	};
	/*let options = {
		spherical: true,
		num: 10,
		maxDistance: theEarth.getRadsFromDistance(20)
	};*/
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
				//maxDistance: theEarth.getRadsFromDistance(2000),
				maxDistance: 20000,
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
	res.status(200);
	res.json({ "status" : "success" });
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
	res.status(200);
	res.json({ "status" : "success" });
};

module.exports.locationsDeleteOne = function(req, res){
	res.status(200);
	res.json({ "status" : "success" });
};