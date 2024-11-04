const router = require('express').Router();

const { getAllTeachers, getFilteredTeachers } = require('../../controllers/teachers.controller');

router.get('/', getAllTeachers);
router.post('/filter', getFilteredTeachers);

module.exports = router;