(function () {
	const loc8rData = function($http) {
		const locationByCoords = (lng, lat) => {
			return $http
				.get(`http://localhost:3000/api/locations?lng=${lng}&lat=${lat}&maxDistance=20000`);
		};
		const locationById = function(locationId){
			return $http
				.get(`http://localhost:3000/api/locations/${locationId}`);
		};
		const addReviewById = (locationId, data) => {
			return $http
				.post(`http://localhost:3000/api/locations/${locationId}/reviews`, data);
		};
		return {
			locationByCoords : locationByCoords,
			locationById : locationById,
			addReviewById : addReviewById
		};	
	};	
	
	loc8rData.$inject = ['$http'];
	
	angular
		.module('loc8rApp')
		.service('loc8rData', loc8rData);
})();