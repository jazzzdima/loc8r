function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeController',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo: '/'});
}

angular
	.module('loc8rApp', ['ngRoute'])
	.config(['$routeProvider', config]);