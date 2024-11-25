const sequelize = require('../config/db');
const Teacher = require('./teachers.model');
const User = require('./users.model');
const Knowledge = require('./knowledges.model');
const Message = require('./messages.model');
const Notification = require('./notifications.model');
const Booking = require('./bookings.model');
const Review = require('./reviews.model');

// Definir las relaciones
Teacher.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Teacher.belongsToMany(Knowledge, { through: 'TeacherKnowledge', as: 'knowledges' });
Knowledge.belongsToMany(Teacher, { through: 'TeacherKnowledge', as: 'teachers' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Booking.belongsTo(User, { foreignKey: 'studentId', as: 'student' });
Booking.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Review.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' });

module.exports = {
  sequelize,
  Teacher,
  User,
  Knowledge,
  Message
};