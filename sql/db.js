const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345',
    database: 'teach4app'
});

connection.connect((error) => {
    if (error) {
        console.error('Error conectando a la base de datos: ', error);
        return;
    } else {
        console.log('Conectado a la base de datos');
    }
});

module.exports = connection;