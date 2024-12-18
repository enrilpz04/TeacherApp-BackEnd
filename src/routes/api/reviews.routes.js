const router = require('express').Router();
const {
  getReviewsByTeacher,
  getReviewsByStudent,
  getAllReviewsBetweenStudentAndTeacher,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} = require('../../controllers/reviews.controller');

// Obtener todas las reviews de un profesor específico
router.get('/teacher/:id', getReviewsByTeacher);

// Obtener todas las reviews de un estudiante específico
router.get('/student/:id', getReviewsByStudent);

// Obtener todas las reviews entre un estudiante y un profesor
router.get('/between', getAllReviewsBetweenStudentAndTeacher);

// Obtener una review por su ID
router.get('/:id', getReviewById);

// Crear una nueva review
router.post('/', createReview);

// Actualizar una review existente
router.put('/:id', updateReview);

// Eliminar una review
router.delete('/:id', deleteReview);

module.exports = router;
