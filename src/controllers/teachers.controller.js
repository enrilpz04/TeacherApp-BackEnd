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
          attributes: ['id', 'name', 'surname', 'email', 'avatar', 'rol']
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

const getTeachersWithPagination = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Teacher.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: ['id', 'price_p_hour', 'schedule', 'validated'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'surname', 'email', 'validated', 'avatar', 'rol']
        }
      ]
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      teachers: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'surname', 'email', 'avatar', 'rol']
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

const getTeacherByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const teacher = await Teacher.findOne({
      where: { userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'surname', 'email', 'avatar', 'rol']
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
}

const createTeacher = async (req, res) => {
  const {  description, schedule, price_p_hour, experience, rating, validated, latitude, longitude, user  } = req.body;
  try {
    const teacher = await Teacher.create({
      description,
      schedule,
      price_p_hour,
      experience,
      rating,
      validated,
      latitude,
      longitude,
      userId: user.id,
    });
    res.status(201).json(teacher);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
}

// Método para actualizar un profesor
const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { description, schedule, price_p_hour, experience, rating, validated, latitude, longitude, user } = req.body;

  console.log(validated)
  try {
    const teacher = await Teacher.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user'
        }
      ]
    });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher no encontrado' });
    }

    // Actualizar los detalles del profesor
    teacher.description = description || teacher.description;
    teacher.schedule = schedule || teacher.schedule;
    teacher.price_p_hour = price_p_hour || teacher.price_p_hour;
    teacher.experience = experience || teacher.experience;
    teacher.rating = rating || teacher.rating;
    teacher.validated = validated;
    teacher.latitude = latitude || teacher.latitude;
    teacher.longitude = longitude || teacher.longitude;

    // Actualizar los detalles del usuario
    if (user) {
      const userToUpdate = await User.findByPk(teacher.userId);
      if (userToUpdate) {
        userToUpdate.name = user.name || userToUpdate.name;
        userToUpdate.surname = user.surname || userToUpdate.surname;
        userToUpdate.email = user.email || userToUpdate.email;
        userToUpdate.validated = user.validated || userToUpdate.validated;
        userToUpdate.avatar = user.avatar || userToUpdate.avatar;
        await userToUpdate.save();
      }
    }

    await teacher.save();

    const updatedTeacher = await Teacher.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'surname', 'email', 'validated', 'avatar', 'rol']
        }
      ]
    });

    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher no encontrado' });
    }
    await teacher.destroy();
    res.status(200).json({ message: 'Teacher eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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
      attributes: ['id', 'name', 'surname', 'email', 'avatar', 'rol'],
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

const getAllTeachersByLocation = async (req, res) => {
  const { latitude, longitude } = req.body;
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
    const filteredTeachers = teachers.filter(teacher => {
      const distance = getDistanceFromLatLonInKm(teacher.latitude, teacher.longitude, latitude, longitude);
      return distance <= 10;
    });
    res.status(200).json(filteredTeachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Agregar un conocimiento a un profesor
const addKnowledgeToTeacher = async (req, res) => {
  const { teacherId, knowledgeId } = req.params;
  try {
    const teacher = await Teacher.findByPk(teacherId);
    const knowledge = await Knowledge.findByPk(knowledgeId);
    if (teacher && knowledge) {
      await teacher.addKnowledge(knowledge);
      res.json({ message: 'Conocimiento agregado al profesor correctamente' });
    } else {
      res.status(404).json({ message: 'Profesor o Conocimiento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un conocimiento de un profesor
const removeKnowledgeFromTeacher = async (req, res) => {
  const { teacherId, knowledgeId } = req.params;
  try {
    const teacher = await Teacher.findByPk(teacherId);
    const knowledge = await Knowledge.findByPk(knowledgeId);
    if (teacher && knowledge) {
      await teacher.removeKnowledge(knowledge);
      res.json({ message: 'Conocimiento eliminado del profesor correctamente' });
    } else {
      res.status(404).json({ message: 'Profesor o Conocimiento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTeachers,
  getTeachersWithPagination,
  getTeacherById,
  getTeacherByUserId,
  getFilteredTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAllTeachersByLocation,
  addKnowledgeToTeacher,
  removeKnowledgeFromTeacher
};