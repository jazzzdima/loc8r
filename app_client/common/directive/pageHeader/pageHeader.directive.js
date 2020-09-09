(function(){	
	function pageHeader(){
		return {
			restrict: 'EA',
			scope: {
				content: '=content'
			},
			templateUrl: '/common/directive/pageHeader/pageHeader.template.html'
		};
	}

	angular
		.module('loc8rApp')
		.directive('pageHeader', pageHeader);
})();