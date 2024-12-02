const jwt = require('jsonwebtoken');
const User = require('../models');

const checkToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Necesitas el token de autenticación. Pasa por el login' });
    }

    const token = authHeader.split(' ')[1]; // Extraer el token después de "Bearer"

    let data;
    try {
        data = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return res.status(401).json({ message: 'El token no es correcto' });
    }

    const user = await User.findByPk(data.id); // Usar findByPk para buscar por clave primaria
    if (!user) {
        return res.status(401).json({ message: 'El usuario no existe' });
    }

    req.user = user;

    next();
}

module.exports = {
    checkToken
}