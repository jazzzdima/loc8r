(function () {
	const loc8rData = function($http) {
		const locationByCoords = (lng, lat) => {
			return $http.get(`http://localhost:3000/api/locations?lng=${lng}&lat=${lat}&maxDistance=20000`);
		};
		return {
			locationByCoords : locationByCoords
		};	
	};
	
	loc8rData.$inject = ['$http'];
	
	angular
		.module('loc8rApp')
		.service('loc8rData', loc8rData);
})();