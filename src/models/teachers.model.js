const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Teacher = sequelize.define('Teacher', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  schedule: {
    type: DataTypes.ENUM('Morning', 'Afternoon', 'Night'),
    allowNull: false
  },
  price_p_hour: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  validated: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: false
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'teachers',
  timestamps: false
});

module.exports = Teacher;