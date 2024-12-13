const router = require('express').Router();

router.use('/auth', require('./api/auth.routes'));
router.use('/users', require('./api/users.routes'))
router.use('/teachers', require('./api/teachers.routes'));
router.use('/knowledges', require('./api/knowledge.routes'));
router.use('/students', require('./api/students.routes'));
router.use('/messages', require('./api/messages.routes'));
router.use('/bookings', require('./api/bookings.routes'));
router.use('/reviews', require('./api/reviews.routes'));
router.use('/notifications', require('./api/notifications.routes'));

module.exports = router;
