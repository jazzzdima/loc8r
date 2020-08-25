(function () {	
	function homeController($scope, loc8rData, geolocation) {
		let vm = this;
		vm.title = 'Loc8r - find a place to work with wifi';
		vm.pageHeader =  {
			title: 'Loc8r',
			straplines: 'Find a place to work with wifi near you!',
			sidebar: 'Loc8r helps you find places to work when out and about Loc8r helps you find places to work when out and about Loc8r helps you find places to work when out and about Loc8r helps you find places to work when out and about',
		};

		vm.message = 'Checking your location';	
		vm.getData = position => {
			let lat = position.coords.latitude;
			let lng = position.coords.longitude;
			vm.message = 'Searching for nearby places';
			loc8rData
				.locationByCoords(lat, lng)
				.then(data => {			
					vm.message = data.data.length > 0 ? "" : "No locations found";
					vm.data = {	locations: data.data };
				})
				.catch(e => {
					vm.message = "Sorry, something's gone wrong";
				});
		};
		vm.showError = error => {
			$scope.$apply(error => {
				vm.message = error.message;
			});
		};
		vm.noGeo = () => {
			$scope.$apply(() => {
				vm.message = 'Geolocation is not supported by this browser';
			});
		};
		geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
	}

	homeController.$inject = ['$scope', 'loc8rData', 'geolocation'];

	angular
		.module('loc8rApp')
		.controller('homeController', homeController);
})();