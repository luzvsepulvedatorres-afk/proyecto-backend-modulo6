const express = require('express');
const router = express.Router();
const { getStatus, getApiHome } = require('../controllers/appController');

// Definimos las rutas usando el router de Express
router.get('/', getApiHome);
router.get('/status', getStatus);

module.exports = router;