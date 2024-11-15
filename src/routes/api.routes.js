const router = require('express').Router();

router.use('/auth', require('./api/auth.routes'));
router.use('/teachers', require('./api/teachers.routes'));

module.exports = router;