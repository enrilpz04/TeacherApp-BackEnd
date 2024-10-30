const express = require('express');

const server = express();
server.use(express.json());

const rutasUsuarios = require('./routes/usuarios.route');
server.use('/api/user', rutasUsuarios);

server.listen(3000, ()=>console.log('Servidor iniciado en http://localhost:3000/api/user y conectado a la base de datos en http://localhost:3000/api/user?email=EMAIL&password=PASSWORD'));