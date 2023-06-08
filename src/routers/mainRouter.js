const express = require('express');
const router = express.Router();

const WController = require('../controllers/WeatherController');


router.get('/', WController.root);

// router.get('/consult', WController.);

// router.post('set-key', WController.);

// router.post('/request-dir', WController.);

module.exports = router;