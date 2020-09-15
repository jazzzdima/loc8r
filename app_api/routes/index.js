var express = require('express');
var router = express.Router();
const controllerLocations = require('../controllers/locations');
const controllerReviews = require('../controllers/reviews');
const controllerAuth = require('../controllers/authentication');

/* Loactions routes */
router.get('/locations', 
	controllerLocations.locationsListByDistance);
router.post('/locations', 
	controllerLocations.locationsCreate);
router.get('/locations/:locationId', 
	controllerLocations.locationsReadOne);
router.put('/locations/:locationId', 
	controllerLocations.locationsUpdateOne);
router.delete('/locations/:locationId', 
	controllerLocations.locationsDeleteOne);

/* Reviews routes*/
router.post('/locations/:locationId/reviews', 
	controllerReviews.reviewsCreate);
router.get('/locations/:locationId/reviews/:reviewId', 
	controllerReviews.reviewsReadOne);
router.put('/locations/:locationId/reviews/:reviewId', 
	controllerReviews.reviewsUpdateOne);
router.delete('/locations/:locationId/reviews/:reviewId', 
	controllerReviews.reviewsDeleteOne);

/*Authenticate routes*/
router.post('/register', controllerAuth.register);
router.post('/login', controllerAuth.login);

module.exports = router;
