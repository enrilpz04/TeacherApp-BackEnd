const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users.model');

/**
 * Autentica un usuario y genera un token JWT.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.body.email - Correo electrónico del usuario.
 * @param {string} req.body.password - Contraseña del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Respuesta JSON con el token JWT o un mensaje de error.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    // Comprobación de email existente
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Comprobación de contraseña correcta
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Creación de campos del token
    const tokenPayload = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      validated: user.validated,
      avatar: user.avatar,
      rol: user.rol
    };

    // Cifrado de token y envío
    const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Registra un nuevo usuario y devuelve el usuario creado.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.body.name - Nombre del usuario.
 * @param {string} req.body.surname - Apellido del usuario.
 * @param {string} req.body.email - Correo electrónico del usuario.
 * @param {string} req.body.password - Contraseña del usuario.
 * @param {string} req.body.rol - Rol del usuario.
 * @param {boolean} req.body.validated - Estado de validación del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Respuesta JSON con el usuario creado o un mensaje de error.
 */
const register = async (req, res) => {
  const { name, surname, email, password, rol, validated } = req.body;

  try {
    // Verificar si el correo electrónico ya existe
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
      rol,
      validated
    });

    const userResponse = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      validated: user.validated,
      avatar: user.avatar,
      rol: user.rol
    };

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  register
};