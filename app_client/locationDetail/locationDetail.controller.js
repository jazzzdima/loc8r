(function(){
	locationDetailController.$inject = ['$routeParams',  '$uibModal', 'loc8rData'];

	function locationDetailController($routeParams, $uibModal, loc8rData){
		let vm = this;
		vm.locationId = $routeParams.locationId;

		loc8rData.locationById(vm.locationId)
			.then(data => {
				vm.data = { location: data.data };
				vm.pageHeader = {
					title: vm.data.location.name
				};		
			})
			.catch(e => {
				console.log(e);
			});
		
		vm.popupReviewForm = () => {
			let modalInstance = $uibModal.open({
				templateUrl: '/reviewModal/reviewModal.view.html',
				controller: 'reviewModalController as vm',
				resolve: {
					locationData: () => {
						return {
							locationId: vm.locationId,
							locationName: vm.data.location.name
						};
					}
				},
			});
			modalInstance.result.then(data => {
				vm.data.location.reviews.push(data.data);
			});
		};
	}

	angular
		.module('loc8rApp')
		.controller('locationDetailController', locationDetailController);
})();