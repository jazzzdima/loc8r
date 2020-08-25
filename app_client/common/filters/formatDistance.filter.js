(function () {
	const _isNumeric = n => {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	const formatDistance = () => {
		return distance => {
			let numDistance, unit;
			if (distance && _isNumeric(distance)) {
				if (distance < 1000) {
					numDistance = parseFloat(distance).toFixed(1);
					unit = 'm';
				} else {
					numDistance = parseInt(distance / 1000, 10);
					unit = 'km';
				}
				return numDistance + unit;
			} else {
				return '?';
			}		
		}	
	};

	angular
		.module('loc8rApp')
		.filter('formatDistance', formatDistance);
})();