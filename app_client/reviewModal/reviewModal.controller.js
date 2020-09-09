(function(){
	reviewModalController.$inject = ['$uibModalInstance', 'locationData', 'loc8rData'];

	function reviewModalController($uibModalInstance, locationData, loc8rData){
		let vm = this;

		vm.formData = {
			name: '',
			text: '',
			rating: ''
		};
		vm.locationData = locationData;
		vm.modal = {
			cancel: () => {
				$uibModalInstance.dismiss('cancel');
			},
			close: result => {
				$uibModalInstance.close(result);
			}
		};
		vm.onSubmit = () => {
			vm.formError = '';
			if (!vm.formData.name || !vm.formData.text || !vm.formData.rating ) {
				vm.formError = 'All fields required';
				return false;
			} else {
				vm.doAddReview(vm.locationData.locationId, vm.formData);				
			}
			
		};

		vm.doAddReview = (locationId, formData) => {
			loc8rData.addReviewById(locationId, {
				author: formData.name,
				text: formData.text,
				rating: formData.rating
			}).then(data => {
				vm.modal.close(data);
			}).catch(data => {
				vm.formError = 'Tou review has not be saved';
			});
			return false;
		};
	}

	angular
		.module('loc8rApp')
		.controller('reviewModalController', reviewModalController);
})();