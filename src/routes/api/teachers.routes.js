const router = require('express').Router();

const { getAllTeachers } = require('../../controllers/teachers.controller');

router.get('/', getAllTeachers);

module.exports = router;