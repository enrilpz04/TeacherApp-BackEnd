const express = require('express');
const router = express.Router();
const upload = require('../../config/multer'); // Importa la configuración de multer
const { register, login } = require('../../controllers/auth.controller');

router.post('/login', login);

// Agrega el middleware de multer para manejar la carga de archivos en la ruta de register
router.post('/register', upload.single('avatar'), register);

module.exports = router;