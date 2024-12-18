const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware configuration
app.use(express.json());
app.use(cors());

// Middleware para servir archivos estáticos
app.use('/uploads/avatars', express.static(path.join(__dirname, './uploads/avatars')));

// Route configuration
app.use('/api', require('./routes/api.routes'));

// Manejar 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
  });


// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json(err);
})

module.exports = app;