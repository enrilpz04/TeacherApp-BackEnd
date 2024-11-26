const router = require('express').Router();

router.use('/auth', require('./api/auth.routes'));
router.use('/teachers', require('./api/teachers.routes'));
router.use('/messages', require('./api/messages.routes'));
router.use('/bookings', require('./api/bookings.routes'));

module.exports = router;
