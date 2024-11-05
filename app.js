const express = require('express');
const cors = require('cors');

const corsOption = {
    credentials: true,
    origin: ['http://localhost:4200']
}
const server = express();
server.use(express.json());
server.use(cors(corsOption));

const rutasUsuarios = require('./routes/usuarios.route');
server.use('/api/user', rutasUsuarios);

server.listen(3000, ()=>console.log('Servidor iniciado en http://localhost:3000/'));