const { Booking, Teacher, User } = require('../models');
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
          attributes: ['userId', 'price_p_hour', 'schedule', 'knowledges']
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
          attributes: ['userId', 'price_p_hour', 'schedule', 'knowledges']
        }
      ],
      order: [['date', 'DESC']]
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBooking = async (req, res) => {
  const { date, startTime, duration, status, totalPrice, studentId, teacherId } = req.body;
  try {
    const booking = await Booking.create({
      date,
      startTime,
      duration,
      status,
      totalPrice,
      studentId,
      teacherId
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateBooking = async (req, res) => {  
  const { id } = req.params;
  const { date, startTime, duration, status, totalPrice, studentId, teacherId } = req.body;
  try {
    const booking = await Booking.update({
      id,
      date,
      startTime,
      duration,
      status,
      totalPrice,
      studentId,
      teacherId
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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
  createBooking,
  updateBooking,
  deleteBooking
};
