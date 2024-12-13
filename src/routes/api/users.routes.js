const router = require('express').Router();
const {
    getStudentsWithPagination,
    updateStudent
} = require('../../controllers/users.controller')

router.get('/students', getStudentsWithPagination)

router.put('/students/:id', updateStudent)

module.exports = router;