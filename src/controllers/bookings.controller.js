const { Booking, User, Teacher, Knowledge } = require('../models');
const { Op, sequelize } = require('sequelize');

/**
 * Obtiene todos los bookings de un estudiante.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.params.studentId - ID del estudiante.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Respuesta JSON con los bookings del estudiante o un mensaje de error.
 */
const getAllBookingsFromStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const bookings = await Booking.findAll({
      where: { studentId: studentId },
      include: [
        {
          model: User,
          as: 'student',
          attributes: { exclude: ['password'] }
        },
        {
          model: Teacher,
          as: 'teacher',
          include: [
            {
              model: Knowledge,
              as: 'knowledges',
              attributes: ['id', 'name'],
              through: { attributes: [] }
            },
            {
              model: User,
              as: 'user',
              attributes: { exclude: ['password'] }
            }
          ]
        }
      ],
      order: [['date', 'DESC']]
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtiene todos los bookings de un profesor.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.params.teacherId - ID del profesor.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Respuesta JSON con los bookings del profesor o un mensaje de error.
 */
const getAllBookingsFromTeacher = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const bookings = await Booking.findAll({
      where: { teacherId: teacherId },
      include: [
        {
          model: User,
          as: 'student',
          attributes: { exclude: ['password'] }
        },
        {
          model: Teacher,
          as: 'teacher',
          include: [
            {
              model: Knowledge,
              as: 'knowledges',
              attributes: ['id', 'name'],
              through: { attributes: [] }
            },
            {
              model: User,
              as: 'user',
              attributes: { exclude: ['password'] }
            }
          ]
        }
      ],
      order: [['date', 'DESC']]
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtiene todos los bookings de un profesor en una fecha específica.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.query.teacherId - ID del profesor.
 * @param {string} req.query.date - Fecha de los bookings.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Respuesta JSON con los bookings del profesor en la fecha específica o un mensaje de error.
 */
const getAllBookingsFromTeacherByDate = async (req, res) => {
  const { teacherId, date } = req.query;
  try {
    const bookings = await Booking.findAll({
      where: {
        teacherId: teacherId,
        date: {
          date
        }
      },
      include: [
        {
          model: User,
          as: 'student',
          attributes: { exclude: ['password'] }
        },
        {
          model: Teacher,
          as: 'teacher',
          include: [
            {
              model: Knowledge,
              as: 'knowledges',
              attributes: ['id', 'name'],
              through: { attributes: [] }
            },
            {
              model: User,
              as: 'user',
              attributes: { exclude: ['password'] }
            }
          ]
        }
      ],
      order: [['date', 'DESC']]
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtiene todos los bookings de un user por fecha y estado.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.query.teacherId - ID del user.
 * @param {string} req.query.date - Fecha de los bookings.
 * @param {string} req.query.status - Estado de los bookings.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Respuesta JSON con los bookings del profesor por fecha y estado o un mensaje de error.
 */
const getAllBookingsFromUserByDateAndStatus = async (req, res) => {
  const { userId, date, status } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Missing required query parameter: teacherId' });
  }

  try {
    const whereClause = {
      [Op.or]: [
        { studentId: userId },
        { '$teacher.user.id$': userId }
      ]
    };

    if (date) {
      whereClause.date = date
    }

    if (status) {
      whereClause.status = status;
    }

    const bookings = await Booking.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'student',
          attributes: { exclude: ['password'] }
        },
        {
          model: Teacher,
          as: 'teacher',
          include: [
            {
              model: Knowledge,
              as: 'knowledges',
              attributes: ['id', 'name'],
              through: { attributes: [] }
            },
            {
              model: User,
              as: 'user',
              attributes: { exclude: ['password'] }
            }
          ]
        }
      ],
      order: [['date', 'DESC']]
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtiene todos los bookings entre un estudiante y un profesor.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.query.studentId - ID del estudiante.
 * @param {string} req.query.teacherId - ID del profesor.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Respuesta JSON con los bookings entre el estudiante y el profesor o un mensaje de error.
 */
const getAllBookingsBetweenStudentAndTeacher = async (req, res) => {
  const { studentId, teacherId } = req.query;
  try {
    const bookings = await Booking.findAll({
      where: { studentId: studentId, teacherId: teacherId },
      include: [
        {
          model: User,
          as: 'student',
          attributes: { exclude: ['password'] }
        },
        {
          model: Teacher,
          as: 'teacher',
          include: [
            {
              model: Knowledge,
              as: 'knowledges',
              attributes: ['id', 'name'],
              through: { attributes: [] }
            },
            {
              model: User,
              as: 'user',
              attributes: { exclude: ['password'] }
            }
          ]
        }
      ],
      order: [['date', 'DESC']]
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtiene un booking por su ID.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.params.id - ID del booking.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Respuesta JSON con el booking o un mensaje de error.
 */
const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id, {
      include: [
        {
          model: User,
          as: 'student',
          attributes: { exclude: ['password'] }
        },
        {
          model: Teacher,
          as: 'teacher',
          include: [
            {
              model: Knowledge,
              as: 'knowledges',
              attributes: ['id', 'name'],
              through: { attributes: [] }
            },
            {
              model: User,
              as: 'user',
              attributes: { exclude: ['password'] }
            }
          ]
        }
      ]
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking no encontrado' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Crea un nuevo booking.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.body.date - Fecha del booking.
 * @param {string} req.body.startTime - Hora de inicio del booking.
 * @param {number} req.body.duration - Duración del booking.
 * @param {string} req.body.status - Estado del booking.
 * @param {number} req.body.totalPrice - Precio total del booking.
 * @param {Object} req.body.student - Objeto del estudiante.
 * @param {Object} req.body.teacher - Objeto del profesor.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Respuesta JSON con el booking creado o un mensaje de error.
 */
const createBooking = async (req, res) => {
  const { date, startTime, duration, status, totalPrice, student, teacher } = req.body;
  try {
    const booking = await Booking.create({
      date,
      startTime,
      duration,
      status,
      totalPrice,
      studentId: student.id,
      teacherId: teacher.id
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Actualiza un booking existente.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.params.id - ID del booking.
 * @param {string} req.body.date - Fecha del booking.
 * @param {string} req.body.startTime - Hora de inicio del booking.
 * @param {number} req.body.duration - Duración del booking.
 * @param {string} req.body.status - Estado del booking.
 * @param {number} req.body.totalPrice - Precio total del booking.
 * @param {string} req.body.studentId - ID del estudiante.
 * @param {string} req.body.teacherId - ID del profesor.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Respuesta JSON con el booking actualizado o un mensaje de error.
 */
const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { date, startTime, duration, status, totalPrice, studentId, teacherId } = req.body;

  console.log(`Intentando actualizar Booking con id: ${id}`);

  try {
    // Buscar el booking por ID
    const booking = await Booking.findByPk(id);
    if (!booking) {
      console.log(`Booking con id: ${id} no encontrado`);
      return res.status(404).json({ error: 'Booking no encontrado' });
    }

    console.log(`Actualizando Booking con id: ${id}`);
    // Actualizar los campos del booking
    await booking.update({
      date,
      startTime,
      duration,
      status,
      totalPrice,
      studentId,
      teacherId
    });

    // Obtener el booking actualizado con las asociaciones
    const updatedBooking = await Booking.findByPk(id, {
      include: [
        {
          model: User,
          as: 'student',
          attributes: { exclude: ['password'] }
        },
        {
          model: Teacher,
          as: 'teacher',
          include: [
            {
              model: Knowledge,
              as: 'knowledges',
              attributes: { exclude: ['password'] }
            },
            {
              model: User,
              as: 'user',
              attributes: { exclude: ['password'] }
            }
          ]
        }
      ]
    });

    console.log(`Booking actualizado correctamente: ${JSON.stringify(updatedBooking)}`);
    res.status(200).json(updatedBooking);

  } catch (error) {
    console.error(`Error al actualizar booking: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Elimina un booking.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.params.id - ID del booking.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Respuesta JSON con un mensaje de éxito o error.
 */
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking no encontrado' });
    }
    await booking.destroy();
    res.status(200).json({ message: 'Booking eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBookingsFromStudent,
  getAllBookingsFromTeacher,
  getAllBookingsFromTeacherByDate,
  getAllBookingsFromUserByDateAndStatus,
  getAllBookingsBetweenStudentAndTeacher,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};