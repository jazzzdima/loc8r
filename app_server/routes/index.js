var express = require('express');
const controllerLocations = require('../controllers/locations');
const controllerOthers = require('../controllers/others');
var router = express.Router();

/* Loactions routes */
router.get('/', controllerLocations.homeList);
router.get('/location/:locationId', controllerLocations.locationInfo);
router.get('/location/review/new', controllerLocations.addReview);

/* Others routes */
router.get('/about', controllerOthers.about);

module.exports = router;
