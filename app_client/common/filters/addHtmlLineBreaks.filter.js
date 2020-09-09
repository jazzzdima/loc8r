(function (){
	function addHtmlLineBreaks(){
		return function(text){
			let output = text.replace(/\n/g, '<br />');
			return output;
		};
	}

	angular
		.module('loc8rApp')
		.filter('addHtmlLineBreaks', addHtmlLineBreaks);
})();