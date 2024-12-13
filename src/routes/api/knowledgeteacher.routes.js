const router= require('express').Router();
const {createTeacherKnowledge}=require('../../controllers/knowledgeteacher.controller')

router.post('/',createTeacherKnowledge);

module.exports = router;