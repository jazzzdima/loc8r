const request = require('request');
const apiOptions = {
	server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://jazzzdima-loc8r.herokuapp.com';
}

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
		locationReviews : responseBody.reviews
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
	const path = `/api/locations/${req.params.locationId}`;
	const requestOptions = {
		url : apiOptions.server + path,
		method : 'GET',
		json : {},
	};
	request(requestOptions, (err, response, body) => {
		body.coords = {
			lng : body.coords[0],
			lat : body.coords[1],
		};
		renderDetailPage(req, res, body);
	});	
};

module.exports.addReview = (req, res) => {	
	res.render('location-review-form', { 
		title: 'Add review',
		locationHeader: {
			name: 'Starcups',
		} 
	});
};