const router = require('express').Router();
const {
  getAllBookingsFromStudent,
  getAllBookingsFromTeacher,
  getAllBookingsFromTeacherByDate,
  getAllBookingsFromUserByDateAndStatus,
  getAllBookingsBetweenStudentAndTeacher,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../../controllers/bookings.controller');

// Peticiones GET
router.get('/student/:studentId', getAllBookingsFromStudent);
router.get('/teacher/:teacherId', getAllBookingsFromTeacher);
router.get('/teacher/date', getAllBookingsFromTeacherByDate);
router.get('/date-status', getAllBookingsFromUserByDateAndStatus);
router.get('/between', getAllBookingsBetweenStudentAndTeacher);
router.get('/:id', getBookingById);

// Peticiones POST
router.post('/', createBooking);

// Peticiones PUT
router.put('/:id', updateBooking);

// Peticiones DELETE
router.delete('/:id', deleteBooking);


module.exports = router;
