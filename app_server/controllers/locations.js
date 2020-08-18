const request = require('request');
const apiOptions = {
	server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://jazzzdima-loc8r.herokuapp.com';
}

const getLocationInfo = (req, res, callback) => {
	const path = `/api/locations/${req.params.locationId}`;
	const requestOptions = {
		url : apiOptions.server + path,
		method : 'GET',
		json : {},
	};
	request(requestOptions, (err, response, body) => {
		if (response.statusCode === 200) {
			body.coords = {
				lng : body.coords[0],
				lat : body.coords[1],
			};
			callback(req, res, body);
		} else {
			_showError(req, res, response.statusCode);
		}		
	});	
};

const renderHomepage = (req, res, responseBody) => {
	let message; 
	let locations = responseBody;

	if (!(responseBody instanceof Array) && responseBody.message) {
		message = responseBody.message;
		locations = [];
	}
	res.render('locations-list', {
		title : 'Loc8r - find a place to work with wifi',
		pageHeader: {
			title: 'Loc8r',
			straplines: 'Find a place to work with wifi near you!',
			sidebar: 'Loc8r helps you find places to work when out and about Loc8r helps you find places to work when out and about Loc8r helps you find places to work when out and about Loc8r helps you find places to work when out and about',
		},
		locations : locations,
		message : message,
	});
};

const renderDetailPage = (req, res, responseBody) => {	
	res.render('location-info', {
		title: 'Location info',
		locationHeader: {
			title: 'Loc8r - find a place to work with wifi',
		},
		locationData : responseBody,
		locationReviews : responseBody.reviews.reverse()
	});
};

const renderReviewForm = (req, res, locationDetail) => {
	res.render('location-review-form', { 
		title: `Reviews ${locationDetail.name} on Loc8r`,
		locationHeader: {
			name: `Review ${locationDetail.name}`,
		},
		error: req.query.err 
	});
};

const _formatDistance = distance => {
	let numDistance, unit;
	if (distance < 1000) {
		numDistance = parseFloat(distance).toFixed(1);
		unit = 'm';
	} else {
		numDistance = parseInt(distance / 1000, 10);
		unit = 'km';
	}
	return numDistance + unit;
};

const _showError = (req, res, status) => {
	let title, text;
	if (status === 404) {
		title = '404, page not found';
		text = 'Sorry, page not found';
	} else {
		title = `${status}, something's gone wrong`;
		text = 'Something, somewhere, has gone little big wrong';
	}
	res.status(status);
	res.render('generic-text', {
		title : title,
		text : text
	});
};

module.exports.homeList = (req, res) => {	
	const path = '/api/locations';
	const requestOptions = {
		url : apiOptions.server + path,
		method : 'GET',
		json : {},
		qs : {
			lng : 48.321846,
			lat : 35.524470,
			maxDistance : 2000,
		},
	};
	request(requestOptions, (err, response, body) => {
		if (response.statusCode === 200 && body.length) {
			body.forEach(element => {
				element.distance = _formatDistance(element.distance);
			});
		}		
		renderHomepage(req, res, body);
	});	
};

module.exports.locationInfo = (req, res) => {
	getLocationInfo(req, res, (req, res, responseData) => {
		renderDetailPage(req, res, responseData);
	});
};

module.exports.addReview = (req, res) => {	
	getLocationInfo(req, res, (req, res, responseData) => {
		renderReviewForm(req, res, responseData);	
	});
};

module.exports.doAddReview = (req, res) => {
	const path = `/api/locations/${req.params.locationId}/reviews`;	
	const postData = {
		author : req.body.name,
		rating : parseInt(req.body.rating, 10),
		text : req.body.review
	};
	const requestOptions = {
		url : apiOptions.server + path,
		method : 'POST',
		json : postData,	
	};
	if (!postData.author || !postData.rating || !postData.text) {
		res.redirect(`/location/${req.params.locationId}/reviews/new?err=val`);
	} else {
		request(requestOptions, (err, response, body) => {
			if (response.statusCode === 201) {
				res.redirect(`/location/${req.params.locationId}`);
			} else if (response.statusCode === 400 && body.errors) {
				res.redirect(
					`/location/${req.params.locationId}/reviews/new?err=val`);
			} else {
				_showError(req, res, response.statusCode);
			}		
		});		
	}
	
};