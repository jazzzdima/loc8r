module.exports.homeList = (req, res) => {	
	res.render('locations-list', { title: 'Home' });
};

module.exports.locationInfo = (req, res) => {	
	res.render('location-info', { title: 'Loaction info' });
};

module.exports.addReview = (req, res) => {	
	res.render('location-review-form', { title: 'Add review' });
};