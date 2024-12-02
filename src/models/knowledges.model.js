const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Knowledge = sequelize.define('Knowledge', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'knowledges',
  timestamps: false // Deshabilita las marcas de tiempo
});

module.exports = Knowledge;