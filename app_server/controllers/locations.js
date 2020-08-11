module.exports.homeList = (req, res) => {	
	res.render('locations-list', { 
		title: 'Loc8r - find a place to work with wifi',
		pageHeader: {
			title: 'Loc8r',
			straplines: 'Find a place to work with wifi near you!',
			sidebar: 'Loc8r helps you find places to work when out and about Loc8r helps you find places to work when out and about Loc8r helps you find places to work when out and about Loc8r helps you find places to work when out and about',
		},
		locations: [{
			name: 'Starcups',
			address: '1251 Sinelnikovo, Mira str, 154/5',
			rating: 3,
			facilities: ['Hot drink', 'Food', 'Premium wifi'],
			distance: '100m'
		},
		{
			name: 'Cafe hero',
			address: 'Nunc eget magna diam. Aenean et orci',
			rating: 4,
			facilities: ['Hot drink', 'Premium wifi'],
			distance: '170m'
		},
		{
			name: 'Ut nec nulla',
			address: 'Mauris pellentesque lorem es',
			rating: 2,
			facilities: ['Hot drink', 'Food', 'Premium wifi'],
			distance: '480m'
		},
		{
			name: 'Phasellus',
			address: 'Donec sed tristique mi',
			rating: 3,
			facilities: ['Food', 'Premium wifi'],
			distance: '95m'
		},
		{
			name: 'Nullam',
			address: 'Sed vel fermentum nunc',
			rating: 4,
			facilities: ['Hot drink', 'Food', 'Premium wifi'],
			distance: '195m'
		},
		{
			name: 'Nam imperdiet',
			address: 'Donec sed tristique mi',
			rating: 4,
			facilities: ['Food', 'Premium wifi'],
			distance: '360m'
		}],
	});
};

module.exports.locationInfo = (req, res) => {	
	res.render('location-info', { 
		title: 'Loaction info',
		locationHeader: {
			title: 'Loc8r - find a place to work with wifi',
		},
		locationData: {
			name: 'Starcup',
			rating: 3,
			address: '1251 Sinelnikovo, Mira str, 154/5',
			opens: {
				Monday: ['7:00am', '7:00pm'],
				Tuesday: ['7:00am', '7:00pm'],
				Wednesday: ['7:00am', '7:00pm'],
				Thursday: ['7:00am', '7:00pm'],
				Friday: ['7:00am', '7:00pm'],
				Saturday: ['8:00am', '5:00pm'],
				Sunday: [],
			},
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