const express = require('express');
const router = express.Router();

const controllerMirath = require('../controllers/mirath').controllers;
const controllerNavbars = require('../controllers/navbars');

// routing mirath api 
router.get('/mirath/alwratha', controllerMirath.readAlwrathaList);
router.post('/mirath/altarika', controllerMirath.addAltarikaData);
router.post('/mirath/alwratha', controllerMirath.addAlwrathaData);
router.get('/mirath/result', controllerMirath.calculateMirath);

router.get('/navbar/:navbarName', controllerNavbars.readOne);
router.post('/navbar', controllerNavbars.createOne);
router.delete('/navbar/:navbarName', controllerNavbars.deleteOne);


module.exports = router;