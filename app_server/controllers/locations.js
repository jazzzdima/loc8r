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
			//lng : 48.321846,
			lng : 0,
			//lat : 35.524470,
			lat : 0,
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
	res.render('location-info', { 
		title: 'Location info',
		locationHeader: {
			title: 'Loc8r - find a place to work with wifi',
		},
		locationData: {
			name: 'Starcup',
			rating: 3,
			address: '1251 Sinelnikovo, Mira str, 154/5',
			coords: {lat: 51.454545, lng: -0.954221},
			opens: {
				Monday: ['7:00am', '7:00pm'],
				Tuesday: ['7:00am', '7:00pm'],
				Wednesday: ['7:00am', '7:00pm'],
				Thursday: ['7:00am', '7:00pm'],
				Friday: ['7:00am', '7:00pm'],
				Saturday: ['8:00am', '5:00pm'],
				Sunday: [],
			},
			openingTimes: [{
				days: 'Monday - Friday',
				opening: '7:00am',
				closing: '7:00pm',
				closed: false,
			},
			{
				days: 'Saturday',
				opening: '8:00am',
				closing: '5:00pm',
				closed: false,
			},
			{
				days: 'Sunday',				
				closed: true,
			}],
			facilities: ['Hot drink', 'Food', 'Premium wifi'],
			mapUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyCp4hWjKqYC6GEa3mLzUrl4N4kgx-evZjI',
			description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet',
		},
		locationReviews: [{
			rating: 3,
			author: "Jazzz",
			timestamp: "16 July 2020",
			text: "What a great place. I can not say enought good things about it.",
		},
		{
			rating: 4,
			author: "Joe",
			timestamp: "17 July 2020",
			text: "Vestibulum vulputate massa consequat elit feugiat consequat. Mauris pellentesque lorem est, vitae finibus eros lobortis eget. Maecenas ac facilisis mauris. Integer hendrerit nec enim sit amet aliquam. Sed vel fermentum nunc, id placerat dolor. Nam imperdiet velit et felis auctor, nec ullamcorper neque laoreet. Phasellus vehicula",
		},
		{
			rating: 5,
			author: "Michael",
			timestamp: "1 July 2020",
			text: "Integer aliquam nisi sit amet luctus sollicitudin. Sed gravida accumsan nulla ut elementum. Etiam ut tellus nec lectus rutrum egestas nec id purus. Sed ut lobortis lorem",
		}],
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