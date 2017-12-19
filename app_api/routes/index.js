var express = require('express');
var router = express.Router();
var controllerLocations = require('../controllers/locations');
var controllerReviews = require('../controllers/reviews');

// routing locations api 
router.get('/location', controllerLocations.readLocationsList);
router.post('/location', controllerLocations.createLocation);
router.get('/location/:locationID', controllerLocations.readOne);
router.put('/location/:locationID', controllerLocations.updateOne);
router.delete('/location/:locationID', controllerLocations.deleteOne);

// routing reviews api
router.post('/location/:locationID/review', controllerReviews.addReview);
router.get('/location/:locationID/review/:reviewID', controllerReviews.readOne);
router.put('/location/:locationID/review/:reviewID', controllerReviews.updateOne);
router.delete('/location/:locationID/review/:reviewID', controllerReviews.deleteOne);

module.exports = router;