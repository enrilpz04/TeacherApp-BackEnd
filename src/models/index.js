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
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
User.hasMany(Review, { 
  foreignKey: 'userId', 
  as: 'reviews',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Conexiones de la tabla teacher
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
// Mensajes y Usuarios
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
// Notificaciones y usuarios
Notification.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });

// Reviews y Usuarios y Teachers (opcion 2)
Review.belongsTo(User, { 
  foreignKey: "userId", 
  as: "user"
});
Review.belongsTo(Teacher, { 
  foreignKey: "teacherId", 
  as: "teacher"
});
User.hasMany(Review, { 
  foreignKey: 'userId', 
  as: 'reviews',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Teacher.hasMany(Review, { 
  foreignKey: 'teacherId', 
  as: 'reviews',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

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

// Revisión de Todas las Asociaciones:

// User y Booking:Un usuario puede tener múltiples bookings como estudiante.
// Teacher y Booking: Un profesor puede tener múltiples bookings.
// Teacher y User: Un profesor está vinculado a un usuario (probablemente para autenticación).
  // Teacher y Knowledge: Relación many-to-many entre profesores y conocimientos.
// Message y User: Los mensajes tienen un sender y un recipient, ambos usuarios.
// Notification y User: Las notificaciones están vinculadas a usuarios.
// Review y User/Teacher: Las reviews están vinculadas a un usuario (estudiante) y a un profesor.