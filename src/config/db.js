const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize('teach4dev',
   process.env.DB_USER,
   process.env.DB_PASS, 
   {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql'
    });

module.exports = sequelize;
