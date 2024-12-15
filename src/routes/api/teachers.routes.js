const router = require('express').Router();
const {
  getAllTeachers,
  getTeacherById,
  getTeacherByUserId,
  getFilteredTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAllTeachersByLocation,
  addKnowledgeToTeacher,
  removeKnowledgeFromTeacher
} = require('../../controllers/teachers.controller');

router.get('/', getAllTeachers);
router.post('/', createTeacher);

router.put('/:id', updateTeacher);
router.get('/:id', getTeacherById);
router.delete('/:id', deleteTeacher);
router.get('/user/:userId', getTeacherByUserId);

router.post('/filter', getFilteredTeachers);
router.post('/location', getAllTeachersByLocation);

// Agregar un conocimiento a un profesor
router.post('/:teacherId/knowledges/:knowledgeId', addKnowledgeToTeacher);

// Eliminar un conocimiento de un profesor
router.delete('/:teacherId/knowledges/:knowledgeId', removeKnowledgeFromTeacher);

module.exports = router;