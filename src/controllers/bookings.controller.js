const { Booking, Teacher, User, Knowledge } = require('../models');
const sequelize = require('../config/db.js');
const { Op } = require('sequelize');

// Método para obtener todos los bookings de un estudiante
const getAllBookingsFromStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const bookings = await Booking.findAll({
      where: { studentId: studentId },
      include: [
        {
          model: User,
          as: 'student',
          attributes: ['id', 'name', 'surname', 'email', 'rol']
        },
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['userId', 'price_p_hour', 'schedule'],
            include: [ 
            {
              model: Knowledge,
              as: 'knowledges',
              attributes: ['name'],
              through: { attributes: [] } 
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

// Método para obtener todos los bookings de un profesor
const getAllBookingsFromTeacher = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const bookings = await Booking.findAll({
      where: { teacherId: teacherId },
      include: [
        {
          model: User,
          as: 'student',
          attributes: ['id', 'name', 'surname', 'email', 'rol']
        },
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['userId', 'price_p_hour', 'schedule'],
            include: [ 
            {
              model: Knowledge,
              as: 'knowledges',
              attributes: ['name'],
              through: { attributes: [] } 
            }
          ]      
        }
      ],
      order: [['date', 'DESC']]
    });
    console.log(bookings);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBookingsFromTeacherAndDate = async (req, res) => {
  const teacherId = req.query.teacherId;
  const date = req.query.date;
  try {
    const bookings = await Booking.findAll({
      where: {
         teacherId: teacherId,
          date: {
            [Op.eq]: sequelize.literal(`DATE('${date}')`)
          }
        },
      order: [['date', 'DESC']]
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllBokingsByTeacherIdDateAndStatus = async (req, res) => {
  const { teacherId, date, status } = req.query;
  console.log(status)

  if (!teacherId) {
    return res.status(400).json({ error: 'Missing required query parameter: teacherId' });
  }

  try {
    const whereClause = { teacherId };

    if (date) {
      whereClause[Op.and] = sequelize.where(sequelize.fn('DATE', sequelize.col('date')), date);
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
          attributes: ['id', 'name', 'surname', 'email', 'rol']
        },
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['id', 'userId', 'price_p_hour', 'schedule'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'surname', 'email']
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

// Método para obtener todos los bookings de un profesor y un estudiante
const getAllBookingsBetweenStudentAndTeacher = async (req, res) => {
  const studentId = req.query.studentId;
  const teacherId = req.query.teacherId;
  try {
    const bookings = await Booking.findAll({
      where: { studentId: studentId, teacherId: teacherId },
      include: [
        {
          model: User,
          as: 'student',
          attributes: ['id', 'name', 'surname', 'email', 'rol']
        },
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['userId', 'price_p_hour', 'schedule'],
            include: [ 
            {
              model: Knowledge,
              as: 'knowledges',
              attributes: ['name'],
              through: { attributes: [] } 
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

// Método para obtener un booking por su ID
const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id, {
      include: [
        {
          model: User,
          as: 'student',
          attributes: ['id', 'name', 'surname', 'email', 'rol']
        },
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['userId', 'price_p_hour', 'schedule'],
          include: [
            {
              model: Knowledge,
              as: 'knowledges',
              attributes: ['name'],
              through: { attributes: [] }
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

// Método para crear un nuevo booking
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
}

// Método para actualizar un booking existente
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
          attributes: ['id', 'name', 'surname', 'email', 'rol']
        },
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['id', 'price_p_hour', 'schedule'],
          include: [
            {
              model: Knowledge,
              as: 'knowledges',
              attributes: ['id', 'name'],
              through: { attributes: [] }
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

// Método para eliminar un booking
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
}

module.exports = {
  getAllBookingsFromStudent,
  getAllBookingsFromTeacher,
  getAllBookingsFromTeacherAndDate,
  getAllBookingsBetweenStudentAndTeacher,
  getAllBokingsByTeacherIdDateAndStatus,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingById
};
