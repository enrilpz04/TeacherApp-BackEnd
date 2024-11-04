const router = require('express').Router();

router.use('/teachers', require('./api/teachers.routes'));

module.exports = router;