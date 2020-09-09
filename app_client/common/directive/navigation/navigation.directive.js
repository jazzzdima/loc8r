(function(){	
	function navigation(){
		return {
			restrict: 'EA',
			templateUrl: '/common/directive/navigation/navigation.template.html'
		};
	}

	angular
		.module('loc8rApp')
		.directive('navigation', navigation);
})();