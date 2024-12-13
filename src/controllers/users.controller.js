const { User } = require('../models');

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
    const { name, surname, email, validated, avatar } = req.body;
  
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
      student.validated = validated || student.validated;
      student.avatar = avatar || student.avatar;
  
      await student.save();
  
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  getStudentsWithPagination,
  updateStudent
};