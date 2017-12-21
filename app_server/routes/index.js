var express = require('express');
var router = express.Router();
var controllerLocations = require('../controllers/locations');
var mirathControllers = require('../controllers/mirath');

// routing locations pages 
router.get('/', mirathControllers.getFirstPage);
router.get('/location/:locationID', controllerLocations.locationInfo);

// routing review page 
router.get('/location/:locationID/review', controllerLocations.addReviewForm);
router.post('/location/:locationID/review', controllerLocations.addReview);

// routing the other pages 
//router.get('/about', controllerOthers.about);

module.exports = router;
