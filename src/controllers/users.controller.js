const { User } = require('../models');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Método para obtener todos los usuarios con rol 'student' con paginación
const getStudentsWithPagination = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await User.findAndCountAll({
      where: { rol: 'student' },
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: ['id', 'name', 'surname', 'email', 'validated', 'avatar', 'rol']
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      students: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para actualizar un estudiante
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, surname, email, password, validated } = req.body;
  const avatar = req.file ? req.file.filename : null;
  
    try {
      const student = await User.findByPk(id);
  
      if (!student) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
  
      if (student.rol !== 'student') {
        return res.status(400).json({ message: 'El usuario no es un estudiante' });
      }
  
      student.name = name || student.name;
      student.surname = surname || student.surname;
      student.email = email || student.email;
      student.validated = validated;
      
      if (password) {
        student.password = bcrypt.hashSync(password, 10);
      }
  
      if (avatar) {
        student.avatar = avatar;
      }
  
      await student.save();
  
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Método para actualizar un estudiante
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, surname, email, password, validated } = req.body;
  const avatar = req.file ? req.file.filename : null;
  
    try {
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
  
      user.name = name || user.name;
      user.surname = surname || user.surname;
      user.email = email || user.email;
      user.validated = validated;
      
      if (password) {
        user.password = bcrypt.hashSync(password, 10);
      }
      console.log(avatar)
      if (avatar) {
      console.log(avatar)
        // Eliminar el avatar anterior si existe
        if (user.avatar) {
          const oldAvatarPath = path.join(__dirname, '../uploads/avatars', user.avatar);
          fs.unlink(oldAvatarPath, (err) => {
            if (err) {
              console.error('Error al eliminar el avatar anterior:', err);
            }
          });
        }
        user.avatar = avatar;
      }
  
      await user.save();
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = {
  getStudentsWithPagination,
  updateStudent,
  updateUser
};