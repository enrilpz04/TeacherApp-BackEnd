const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./users.model');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('new_teacher', 'teacher_validation', 'new_booking', 'booking_confirmed', 'booking_cancelled', 'new_message', 'new_review'),
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  watched: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'notifications',
  timestamps: false
});

module.exports = Notification;