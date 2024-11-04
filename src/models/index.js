const sequelize = require('../config/db');
const Teacher = require('./teachers.model');
const User = require('./users.model');
const Knowledge = require('./knowledges.model');

// Definir las relaciones
Teacher.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Teacher.belongsToMany(Knowledge, { through: 'TeacherKnowledge', as: 'knowledges' });
Knowledge.belongsToMany(Teacher, { through: 'TeacherKnowledge', as: 'teachers' });

module.exports = {
  sequelize,
  Teacher,
  User,
  Knowledge
};