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


// Conexiones de la tabla User
User.hasMany(Booking, { foreignKey: 'studentId', as: 'studentBookings' });
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
User.hasMany(Review, { 
  foreignKey: 'userId', 
  as: 'reviews',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Conexiones de la tabla teacher
Teacher.hasMany(Booking, { foreignKey: 'teacherId', as: 'teacherBookings' });
Teacher.belongsTo(User, { foreignKey: "userId", as: "user" });
Teacher.belongsToMany(Knowledge, {
  through: "TeacherKnowledge",
  as: "knowledges",
  foreignKey: 'teacherId',
  otherKey: 'knowledgeId'
});
Teacher.hasMany(Review, { 
  foreignKey: 'teacherId', 
  as: 'reviews',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Conexiones de la tabla Booking
Booking.belongsTo(User, { foreignKey: 'studentId', as: 'student' });
Booking.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' });

// Conexiones de la tabla Review
Review.belongsTo(User, { 
  foreignKey: "userId", 
  as: "user"
});
Review.belongsTo(Teacher, { 
  foreignKey: "teacherId", 
  as: "teacher"
});

// Conexiones de la tabla Knowledge
Knowledge.belongsToMany(Teacher, {
  through: "TeacherKnowledge",
  as: "teachers",
  foreignKey: 'knowledgeId',
  otherKey: 'teacherId'
});

// Conexiones de la tabla Messages
Message.belongsTo(User, { 
  foreignKey: "senderId", 
  as: "sender",
  onDelete: 'CASCADE', // Cambiado de SET NULL a CASCADE
  onUpdate: 'CASCADE'
});
Message.belongsTo(User, { 
  foreignKey: "recipientId", 
  as: "recipient",
  onDelete: 'CASCADE', // Cambiado de SET NULL a CASCADE
  onUpdate: 'CASCADE'
});

// Conexiones de la tabla Notifications
Notification.belongsTo(User, { foreignKey: "userId", as: "userNotification" });

module.exports = {
  sequelize,
  User,
  Teacher,
  Knowledge,
  TeacherKnowledge,
  Message,
  Notification,
  Booking,
  Review,
};