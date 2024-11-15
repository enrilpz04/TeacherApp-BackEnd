const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('teach4dev', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;