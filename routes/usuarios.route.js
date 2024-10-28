const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');
const router = express.Router();

router.get('/', usuariosController.getUser);

module.exports = router;



