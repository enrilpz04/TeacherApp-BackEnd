const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users.model');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, name: user.name, surname: user.surname, rol: user.rol }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const register = async (req, res) => {
    const { name, surname, email, password, rol } = req.body;
  
    try {
      // Verificar si el correo electrónico ya existe
      const existingUser = await User.findOne({ where: { email } });
  
      if (existingUser) {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
      }
  
      const hashedPassword = bcrypt.hashSync(password, 10); // Encriptar la contraseña
      const user = await User.create({
        name,
        surname,
        email,
        password: hashedPassword, // Almacenar la contraseña encriptada
        rol
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    login,
    register
};