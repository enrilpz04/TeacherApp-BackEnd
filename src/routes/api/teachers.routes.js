const router = require('express').Router();
const upload = require('../../config/multer'); 
const {
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
} = require('../../controllers/teachers.controller');

router.get('/', getAllTeachers);
router.get('/pagination', getTeachersWithPagination)
router.put('/:id', updateTeacher);
router.post('/', upload.single('avatar'), createTeacher);

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