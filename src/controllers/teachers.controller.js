const { Teacher, User, Knowledge } = require('../models');
const { Op } = require('sequelize');

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

const getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findByPk(id, {
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
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para obtener teachers con filtros
const getFilteredTeachers = async (req, res) => {
  const { knowledge, schedule, minPrice, maxPrice, orderOption, name } = req.body;

  const filters = {};
  if (minPrice !== undefined) filters.price_p_hour = { [Op.gte]: minPrice };
  if (maxPrice !== undefined) filters.price_p_hour = { ...filters.price_p_hour, [Op.lte]: maxPrice };
  if (schedule !== "") filters.schedule = schedule

  const include = [
    {
      model: User,
      as: 'user',
      attributes: ['id', 'name', 'surname', 'email', 'rol'],
      where: {}
    },
    {
      model: Knowledge,
      as: 'knowledges',
      through: { attributes: [] },
      where: {}
    }
  ];

  if (knowledge !== "") include[1].where.name = knowledge;
  if (name !== undefined && name !== "") {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      include[0].where = {
        [Op.and]: [
          { name: { [Op.like]: `%${nameParts[0]}%` } },
          { surname: { [Op.like]: `%${nameParts[1]}%` } }
        ]
      };
    } else {
      include[0].where = {
        [Op.or]: [
          { name: { [Op.like]: `%${name}%` } },
          { surname: { [Op.like]: `%${name}%` } }
        ]
      };
    }
  }

  let order = [];
  if (orderOption) {
    switch (orderOption) {
      case 'Mejor Valoracion':
        order.push(['rating', 'DESC']);
        console.log(order);
        break;
      case 'Precio más alto':
        order.push(['price_p_hour', 'DESC']);
        break;
      case 'Precio más bajo':
        order.push(['price_p_hour', 'ASC']);
        break;
      default:
        break;
    }
  }

  try {
    const teachers = await Teacher.findAll({
      where: filters,
      include,
      order
    });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  getFilteredTeachers
};