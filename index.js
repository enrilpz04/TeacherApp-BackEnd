// Server creation and configuration
const http = require('http');
const app = require('./src/app');

// Config .env
require('dotenv').config();

// Importa y configura la base de datos y los modelos
const { sequelize } = require('./src/models');

// Server creation
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Sincroniza la bas({ alter: true })e de datos y luego inicia el servidor
sequelize.sync({ alter: true })// Esta línea sincroniza los modelos sin eliminar datos
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Listeners
server.on('error', (error) => {
  console.log(error);
});