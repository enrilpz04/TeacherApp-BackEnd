const multer = require('multer');
const path = require('path');

// Configuración de multer para almacenar archivos en una carpeta específica
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/avatars/'));
  },
  filename: (req, file, cb) => {
    const { name, surname, email } = req.body;
    const fileExtension = path.extname(file.originalname);
    const fileName = `${name}.${surname}.${email}${fileExtension}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

module.exports = upload;