const loc8rData = function($http) {
	const locationByCoords = (lng, lat) => {
		return $http.get(`http://localhost:3000/api/locations?lng=${lng}&lat=${lat}&maxDistance=2000`);
	};
	return {
		locationByCoords : locationByCoords
	};	
};

const geolocation = function() {
	let getPosition = (cbSuccess, cbError, cbNoGeo) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
		} else {
			cbNoGeo();
		}
	};
	return {
		getPosition : getPosition
	};
};

const locationListController = ($scope, loc8rData, geolocation) => {
	$scope.message = 'Checking you location';

	$scope.getData = position => {
		let lat = position.coords.latitude;
		let lng = position.coords.longitude;
		
		$scope.message = 'Searching for nearby places';	
		loc8rData
			.locationByCoords(lat, lng)
			.then(data => {			
				$scope.message = data.data.length > 0 ? "" : "No locations found";
				$scope.data = {	locations: data.data };
			})
			.catch(e => {
				$scope.message = "Sorry, something's gone wrong";
			});
	};

	$scope.showError = error => {
		$scope.$apply(() => {
			$scope.message = error.message;
		});
	};

	$scope.noGeo = error => {
		$scope.$apply(() => {
			$scope.message = "Geolocation not supported";
		});
	};

	geolocation
		.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

const formatDistance = () => {
	return distance => {
		let numDistance, unit;
		if (distance < 1000) {
			numDistance = parseFloat(distance).toFixed(1);
			unit = 'm';
		} else {
			numDistance = parseInt(distance / 1000, 10);
			unit = 'km';
		}
		return numDistance + unit;
	}	
};

const ratingStars = () => {
	return {
		scope: {
			thisRating : '=rating'
		},
		templateUrl : "/angular/rating-stars.html"
	};
};

angular
	.module('loc8rApp', [])
	.controller('locationListController', locationListController)
	.filter('formatDistance', formatDistance)
	.directive('ratingStars', ratingStars)
	.service('loc8rData', loc8rData)
	.service('geolocation', geolocation);