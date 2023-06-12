const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer();

const WController = require('../controllers/WeatherController');


router.get('/', WController.root);
router.get('/consult', WController.consultWeather);
router.get('/keys', WController.getKeys);
router.post('/setkey', upload.none(), WController.postKey);

// router.post('/request-dir', WController.);

module.exports = router;