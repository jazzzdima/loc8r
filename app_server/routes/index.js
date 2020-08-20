var express = require('express');
const controllerLocations = require('../controllers/locations');
const controllerOthers = require('../controllers/others');
var router = express.Router();

/* Loactions routes */
router.get('/', 
	controllerOthers.angularApp);
/*router.get('/', 
	controllerLocations.homeList);
router.get('/location/:locationId', 
	controllerLocations.locationInfo);
router.get('/location/:locationId/reviews/new', 
	controllerLocations.addReview);
router.post('/location/:locationId/reviews/new', 
	controllerLocations.doAddReview);*/

/* Others routes */
router.get('/about', controllerOthers.about);

module.exports = router;
