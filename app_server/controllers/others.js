module.exports.about = (req, res) => {	
	res.render('generic-text', { 
		title: 'About',
		text: 
			'Loc8r was created to help people find places to sit' + 
			'down and get a bit of work done.<br />' +  
			'Lorem Iplsum eewg gwgwgrgerg gwerg5gegfsn gfng bwd' + 
			'down and get a bit of work done.<br />' +  
			'Lorem Iplsum eewg gwgwgrgerg gwerg5gegfsn gfng bwd' + 
			'Vestibulum vulputate massa consequat elit feugiat' +  
			'consequat. Mauris pellentesque lorem est, vitae <br />'+
			'finibus eros lobortis eget. <b>Maecenas</b> ac ' + 
			'facilisis mauris. Integer hendrerit nec enim sit' + 
			'amet <small>aliquam</small>. Sed vel fermentum nunc' + 
			'id placerat dolor. Nam imperdiet velit et felis auctor, ' +
			'nec ullamcorper neque laoreet. Phasellus vehicula',			
	});
};

module.exports.angularApp = (req, res) => {
	res.render('layout', {title:'Loc8r'});
};