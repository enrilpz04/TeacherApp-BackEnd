const { Review, Teacher, User } = require('../models');
const sequelize = require('../config/db.js');
const { Op } = require('sequelize');

// Método para obtener todas las reviews de un profesor específico
const getReviewsByTeacher = async (req, res) => {
  const { id } = req.params; // Cambio aquí
  try {
    const reviews = await Review.findAll({
      where: { teacherId: id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'surname', 'avatar', 'email']
        },
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['id', 'description']
        }
      ],
      order: [['date', 'DESC']]
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todas las reviews de un estudiante específico
const getReviewsByStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const reviews = await Review.findAll({
      where: { studentId },
      include: [
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['id', 'description', 'schedule']
        }
      ],
      order: [['date', 'DESC']]
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todas las reviews entre un estudiante y un profesor
const getAllReviewsBetweenStudentAndTeacher = async (req, res) => {
  const { studentId, teacherId } = req.query;
  try {
    const reviews = await Review.findAll({
      where: { studentId, teacherId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'surname', 'email', 'rol']
        },
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['id', 'description', 'schedule']
        }
      ],
      order: [['date', 'DESC']]
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener una review por su ID
const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'surname', 'email', 'rol']
        },
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['id', 'description', 'schedule']
        }
      ]
    });
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para crear una nueva review
const createReview = async (req, res) => {
  const { rating, comment, date, user, teacher } = req.body;
  try {
    const newReview = await Review.create({
      rating,
      comment,
      date,
      userId: user.id,
      teacherId: teacher.id
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para actualizar una review existente
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const review = await Review.findByPk(id);
    if (review) {
      review.rating = rating !== undefined ? rating : review.rating;
      review.comment = comment !== undefined ? comment : review.comment;
      await review.save();
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para eliminar una review
const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id);
    if (review) {
      await review.destroy();
      res.status(200).json({ message: 'Review deleted successfully' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReviewsByTeacher,
  getReviewsByStudent,
  getAllReviewsBetweenStudentAndTeacher,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
