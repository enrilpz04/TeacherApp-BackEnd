const{TeacherKnowledge, Knowledge}= require('../models');
const sequelize= require('../config/db.js');
const {Op}= require('sequelize');

const createTeacherKnowledge= async(req,res)=>{
    const {teacherId, knowledgeId}= req.params;
    console.log(teacherId, " ", knowledgeId)
try {
   const teacherknowledge= await TeacherKnowledge.createTeacherKnowledge({teacherId,knowledgeId})
   res.json(teacherknowledge)
} catch (error) {
    res.status(500).json(error)
}
}



module.exports={createTeacherKnowledge}