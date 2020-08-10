module.exports.homeList = (req, res) => {	
	res.render('index', { title: 'Home' });
};

module.exports.locationInfo = (req, res) => {	
	res.render('index', { title: 'Loaction info' });
};

module.exports.addReview = (req, res) => {	
	res.render('index', { title: 'add Review' });
};