(function(){	
	function footerGeneric(){
		return {
			restrict: 'EA',
			templateUrl: '/common/directive/footerGeneric/footerGeneric.template.html'
		};
	}

	angular
		.module('loc8rApp')
		.directive('footerGeneric', footerGeneric);
})();