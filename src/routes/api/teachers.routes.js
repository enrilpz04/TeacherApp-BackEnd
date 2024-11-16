const router = require('express').Router();
const {
  getAllTeachers,
  getTeacherById,
  getFilteredTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAllTeachersByLocation
} = require('../../controllers/teachers.controller');

router.get('/', getAllTeachers);
router.post('/', createTeacher);

router.put('/:id', updateTeacher);
router.get('/:id', getTeacherById);
router.delete('/:id', deleteTeacher);

router.post('/filter', getFilteredTeachers);
router.post('/location', getAllTeachersByLocation);




module.exports = router;