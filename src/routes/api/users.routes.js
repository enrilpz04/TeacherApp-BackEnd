const router = require('express').Router();
const upload = require('../../config/multer'); 
const {
    getStudentsWithPagination,
    updateStudent,
    updateUser
} = require('../../controllers/users.controller')

router.get('/students', getStudentsWithPagination)

router.put('/students/:id', upload.single('avatar'), updateStudent)
router.put('/:id', upload.single('avatar'), updateUser)

module.exports = router;