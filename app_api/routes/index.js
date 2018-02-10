const express = require('express');
const router = express.Router();

const controllerMirath = require('../controllers/mirath').controllers;
const controllerNavbars = require('../controllers/navbars');
const controllerAyat = require('../controllers/ayat');

// routing mirath api 
router.get('/mirath/alwratha', controllerMirath.readAlwrathaList);
router.post('/mirath/altarika', controllerMirath.addAltarikaData);
router.post('/mirath/alwratha', controllerMirath.addAlwrathaData);
router.get('/mirath/result', controllerMirath.calculateMirath);

// routing navbars api 
router.get('/navbar/:navbarName', controllerNavbars.readOne);
router.post('/navbar', controllerNavbars.createOne);
router.delete('/navbar/:navbarName', controllerNavbars.deleteOne);

// routing ayat api 
router.get('/ayat/:topic', controllerAyat.readList);
router.post('/ayat', controllerAyat.createAyat);
router.delete('/ayat/:topic', controllerAyat.deleteAyat);

module.exports = router;