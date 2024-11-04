const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pruebas', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;