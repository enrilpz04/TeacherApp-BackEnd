const router = require('express').Router();
const {
  getAllBookingsFromStudent,
  getAllBookingsFromTeacher,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../../controllers/bookings.controller');

router.get('/user/:studentId', getAllBookingsFromStudent);

router.get('/teacher/:teacherId', getAllBookingsFromTeacher);

router.post('/', createBooking);

router.put('/:id', updateBooking);

router.delete('/:id', deleteBooking);


module.exports = router;
