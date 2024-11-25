const router = require('express').Router();

router.use('/auth', require('./api/auth.routes'));
router.use('/teachers', require('./api/teachers.routes'));
router.use('/messages', require('./api/messages.routes'));

module.exports = router;