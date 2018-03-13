var express = require('express');
var router = express.Router();

var generalControllers = require('../controllers/general');
var mirathControllers = require('../controllers/mirath');

// Routing the general pages 
router.get('/', generalControllers.getHome);
router.get('/about', generalControllers.getAboutPage);

// Routing mirath pages 
router.get('/mirath', mirathControllers.getHome);
router.get('/mirath/altarika', mirathControllers.getAltarikaPage);
router.get('/mirath/alwratha', mirathControllers.getAlwrathaPage);
router.get('/mirath/result', mirathControllers.getResultPage);
router.get('/mirath/result/detail', mirathControllers.getDetailPage);
router.post('/mirath/altarika', mirathControllers.processAltarikaData); 
router.post('/mirath/alwratha', mirathControllers.processAlwrathaData);

module.exports = router;
