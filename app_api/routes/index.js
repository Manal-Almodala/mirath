const express = require('express');
const router = express.Router();

const controllerMirath = require('../controllers/mirath').controllers;

// routing mirath api 
router.get('/mirath/alwratha', controllerMirath.readAlwrathaList);
router.post('/mirath/altarika', controllerMirath.addAltarikaData);
router.post('/mirath/alwratha', controllerMirath.addAlwrathaData);
router.get('/mirath/result', controllerMirath.calculateMirath);

module.exports = router;