var express = require('express');
var router = express.Router();
var controllerLocations = require('../controllers/locations');
var generalControllers = require('../controllers/general');
var mirathControllers = require('../controllers/mirath');

// Routing the general pages 
router.get('/', generalControllers.getHome);
router.get('/about', generalControllers.getAboutPage);

// Routing mirath pages 
router.get('/mirath', mirathControllers.getHome);
router.get('/mirath/data-entry', mirathControllers.getDataPage);
router.get('/mirath/result', mirathControllers.getResultPage);
router.get('/mirath/result/detail', mirathControllers.getDetailPage);

module.exports = router;
