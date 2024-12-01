const router = require('express').Router();
const {
  getStudentById,
  getAllStudents
} = require('../../controllers/students.controller');

// Obtener todos los estudiantes
router.get('/', getAllStudents);

// Obtener un estudiante por su ID
router.get('/:id', getStudentById);

module.exports = router;