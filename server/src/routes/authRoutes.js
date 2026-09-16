// Rutas de autenticación para Express
const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/authController');

// Definición de endpoints
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

module.exports = router;

