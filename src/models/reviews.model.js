const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Review = sequelize.define('Review', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
          min: 1,
          max: 5
      }
  },
  comment: {
      type: DataTypes.TEXT,
      allowNull: true
  },
  date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
  },
  userId: { // Aquí está 'studentId' renombrado a 'userId'
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'users',
          key: 'id'
      },
    onDelete: 'CASCADE', // Ajusta según tus necesidades
    onUpdate: 'CASCADE'
  },
  teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'teachers',
          key: 'id'
      },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'reviews',
  timestamps: false
});

module.exports = Review;