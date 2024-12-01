const { User } = require('../models');
const { Op } = require('sequelize');

// Obtener un estudiante por su ID
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await User.findByPk(id, {
      where: { rol: 'student' }, // Asegúrate de que el campo de rol sea correctamente nombrado
      attributes: ['id', 'name', 'surname', 'email', 'rol']
    });

    if (student && student.rol === 'student') {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los estudiantes
const getAllStudents = async (req, res) => {
  try {
    const students = await User.findAll({
      where: { rol: 'student' },
      attributes: ['id', 'name', 'surname', 'email', 'rol']
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudentById,
  getAllStudents
};