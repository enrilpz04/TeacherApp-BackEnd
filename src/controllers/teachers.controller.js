const { Teacher, User, Knowledge, TeacherKnowledge, Notification } = require('../models');
const sequelize = require('../config/db'); // Importa la configuración de sequelize
const bcrypt = require('bcryptjs');
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

/**
 * Crea un nuevo profesor y sus conocimientos asociados.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.body.name - Nombre del usuario.
 * @param {string} req.body.surname - Apellido del usuario.
 * @param {string} req.body.email - Correo electrónico del usuario.
 * @param {string} req.body.password - Contraseña del usuario.
 * @param {string} req.body.rol - Rol del usuario.
 * @param {boolean} req.body.validated - Estado de validación del usuario.
 * @param {string} req.body.description - Descripción del profesor.
 * @param {string} req.body.schedule - Horario del profesor.
 * @param {number} req.body.price_p_hour - Precio por hora del profesor.
 * @param {number} req.body.experience - Experiencia del profesor.
 * @param {number} req.body.rating - Calificación del profesor.
 * @param {number} req.body.latitude - Latitud del profesor.
 * @param {number} req.body.longitude - Longitud del profesor.
 * @param {Array} req.body.knowledgeIds - IDs de los conocimientos asociados.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Respuesta JSON con el profesor creado o un mensaje de error.
 */
const createTeacher = async (req, res) => {
  const { name, surname, email, password, rol, validated, description, schedule, price_p_hour, experience, rating, latitude, longitude, knowledgeIds } = req.body;
  const avatar = req.file ? req.file.filename : null;

  const transaction = await sequelize.transaction();

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
      rol,
      avatar,
      validated
    }, { transaction });

    const teacher = await Teacher.create({
      description,
      schedule,
      price_p_hour,
      experience,
      rating,
      validated : false,
      latitude,
      longitude,
      userId: user.id
    }, { transaction });

    // Supongamos que el array viene como un string JSON
    const knowledgeIds = JSON.parse(req.body.knowledgeIds); // O req.body.knowledgeIds si es un body JSON

    // Convierte los valores a enteros (si no están ya en ese formato)
    const knowledgeIdsInt = knowledgeIds.map(id => parseInt(id, 10));

    // Asegúrate de que los valores son enteros antes de procesarlos
    if (knowledgeIdsInt.every(id => Number.isInteger(id))) {
      try {
        for (const knowledgeId of knowledgeIdsInt) {
          await TeacherKnowledge.create({
            teacherId: teacher.id,
            knowledgeId: knowledgeId // Ya es un número entero
          }, { transaction });
        }
      } catch (knowledgeError) {
        console.error('Error al crear registros en TeacherKnowledge:', knowledgeError);
        throw knowledgeError;
      }
    } else {
      throw new Error('Algunos IDs no son enteros');
    }

    console.log("Voy a notificacioneees")

    const notification = await Notification.create({
      type: 'new_teacher_registration',
      message: 'Hay un nuevo profesor pendiente de validación: ' + user.name + " " + user.surname + ", con id: " + teacher.id,
      date: new Date(),
      watched: false,
      userId: 1
    }, { transaction })

    await transaction.commit();

    res.status(201).json({ user, teacher });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

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