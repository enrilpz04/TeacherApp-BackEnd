const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');
const router = express.Router();

router.post('/login', usuariosController.login);

module.exports = router;