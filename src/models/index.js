// index.js
const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');

// Definir los modelos
const Teacher = require("./teachers.model");
const User = require("./users.model");
const Knowledge = require("./knowledges.model");
const Message = require("./messages.model");
const Notification = require("./notifications.model");
const Booking = require("./bookings.model");
const Review = require("./reviews.model");

// Definir asociaciones

// Usuario y Booking
User.hasMany(Booking, { foreignKey: 'studentId', as: 'studentBookings' });
Booking.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

// Teacher y Booking
Teacher.hasMany(Booking, { foreignKey: 'teacherId', as: 'teacherBookings' });
Booking.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' });
Teacher.belongsTo(User, { foreignKey: "userId", as: "user" });

// Asociaciones many-to-many entre Teacher y Knowledge
Teacher.belongsToMany(Knowledge, {
  through: "TeacherKnowledge",
  as: "knowledges",
});
Knowledge.belongsToMany(Teacher, {
  through: "TeacherKnowledge",
  as: "teachers",
});

// Mensajes y usuarios
Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Message.belongsTo(User, { foreignKey: "recipientId", as: "recipient" });

// Notificaciones y usuarios
Notification.belongsTo(User, { foreignKey: "userId", as: "user" });

// Review y Usuarios y Teachers
Review.belongsTo(User, { foreignKey: "userId", as: "user" });
Review.belongsTo(Teacher, { foreignKey: "teacherId", as: "teacher" });

module.exports = {
  sequelize,
  Teacher,
  User,
  Knowledge,
  Message,
  Notification,
  Booking,
  Review,
};
