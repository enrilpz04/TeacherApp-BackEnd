const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TeacherKnowledge = sequelize.define('TeacherKnowledge', {
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teachers', // Asegúrate de que el nombre coincide con tu modelo de Teacher
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  knowledgeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'knowledges', // Asegúrate de que el nombre coincide con tu modelo de Knowledge
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'TeacherKnowledge',
  timestamps: false
});

module.exports = TeacherKnowledge;