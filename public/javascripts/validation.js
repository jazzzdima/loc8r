$('#addReview').submit(function(e) {	
	$('.alert.alert-danger').hide();
	if (!$('input#name').val() || !$('select#raiting').val() || 
		!$('textarea#review').val()) {
		if ($('.alert.alert-danger').length) {
			$('.alert.alert-danger').show();
		} else {
			$(this).prepend('<div role="alert" class="alert alert-danger">All fields, required, try again</div>');
		}
		return false;
	}
});