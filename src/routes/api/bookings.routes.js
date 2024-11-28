const router = require('express').Router();
const {
  getAllBookingsFromStudent,
  getAllBookingsFromTeacher,
  getAllBookingsBetweenStudentAndTeacher,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingById
} = require('../../controllers/bookings.controller');

router.get('/student/:studentId', getAllBookingsFromStudent);

router.get('/teacher/:teacherId', getAllBookingsFromTeacher);

router.get('/between/', getAllBookingsBetweenStudentAndTeacher);

router.get('/:id', getBookingById);

router.post('/', createBooking);

router.put('/:id', updateBooking);

router.delete('/:id', deleteBooking);


module.exports = router;
