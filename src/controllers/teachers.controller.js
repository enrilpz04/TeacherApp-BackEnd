const { Teacher, User, Knowledge } = require('../models');

// Método para obtener todos los teachers
const getAllTeachers = async (req, res) => {
    try {
      const teachers = await Teacher.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'surname', 'email', 'rol']
          },
          {
            model: Knowledge,
            as: 'knowledges',
            through: { attributes: [] } // Para excluir los atributos de la tabla intermedia
          }
        ]
      });
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getAllTeachers
  };