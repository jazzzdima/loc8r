function homeController($scope) {
	let vm = this;
	vm.title = 'Loc8r - find a place to work with wifi';
	vm.pageHeader =  {
		title: 'Loc8r',
		straplines: 'Find a place to work with wifi near you!',
		sidebar: 'Loc8r helps you find places to work when out and about Loc8r helps you find places to work when out and about Loc8r helps you find places to work when out and about Loc8r helps you find places to work when out and about',
	};
}

angular
	.module('loc8rApp')
	.controller('homeController', homeController);