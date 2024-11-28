const router = require('express').Router();
const {
  getAllBookingsFromStudent,
  getAllBookingsFromTeacher,
  getAllBookingsBetweenStudentAndTeacher,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../../controllers/bookings.controller');

router.get('/user/:studentId', getAllBookingsFromStudent);

router.get('/teacher/:teacherId', getAllBookingsFromTeacher);

router.get('/between/', getAllBookingsBetweenStudentAndTeacher);

router.post('/', createBooking);

router.put('/:id', updateBooking);

router.delete('/:id', deleteBooking);


module.exports = router;
