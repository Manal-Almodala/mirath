const express = require('express');
const router = express.Router();
const controllerLocations = require('../controllers/locations');
const controllerReviews = require('../controllers/reviews');
const controllerMirath = require('../controllers/mirath').controllers;

// routing mirath api 
router.get('/mirath/alwratha', controllerMirath.readAlwrathaList);
router.post('/mirath/altarika', controllerMirath.addAltarikaData);
router.post('/mirath/alwratha', controllerMirath.addAlwrathaData);
router.get('/mirath/result', controllerMirath.calculateMirath);
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