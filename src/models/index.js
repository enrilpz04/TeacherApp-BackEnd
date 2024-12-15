// index.js
const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');

// Definir los modelos
const Teacher = require("./teachers.model");
const User = require("./users.model");
const Knowledge = require("./knowledges.model");
const TeacherKnowledge = require("./teacherKnowledges.model");
const Message = require("./messages.model");
const Notification = require("./notifications.model");
const Booking = require("./bookings.model");
const Review = require("./reviews.model");

// Definir asociaciones
// Conexiones de la tabla User
// Usuario y Booking
User.hasMany(Booking, { foreignKey: 'studentId', as: 'studentBookings' });
Booking.belongsTo(User, { foreignKey: 'studentId', as: 'student' });
User.hasMany(Booking, { foreignKey: 'teacherId', as: 'teacherBookings' });
Booking.belongsTo(User, { foreignKey: 'teacherId', as: 'teacherUser' }); // Cambiado alias a 'teacherUser'
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
User.hasMany(Review, { 
  foreignKey: 'userId', 
  as: 'userReviews',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Conexiones de la tabla Teacher
// Teacher y Booking
Teacher.hasMany(Booking, { foreignKey: 'teacherId', as: 'teacherBookings' });
Booking.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' });
Teacher.belongsTo(User, { foreignKey: "userId", as: "user" });

// Asociaciones many-to-many entre Teacher y Knowledge
Teacher.belongsToMany(Knowledge, {
  through: "TeacherKnowledge",
  as: "knowledges",
  foreignKey: 'teacherId',
  otherKey: 'knowledgeId'
});
Teacher.hasMany(Review, { 
  foreignKey: 'teacherId', 
  as: 'teacherReviews',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Exportar los modelos y la conexión
module.exports = {
  sequelize,
  Teacher,
  User,
  Knowledge,
  TeacherKnowledge,
  Message,
  Notification,
  Booking,
  Review
};