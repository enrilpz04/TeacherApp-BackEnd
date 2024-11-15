const router = require('express').Router();

const { getAllTeachers, getTeacherById, getFilteredTeachers } = require('../../controllers/teachers.controller');

router.get('/', getAllTeachers);
router.post('/filter', getFilteredTeachers);
router.get('/:id', getTeacherById);

module.exports = router;