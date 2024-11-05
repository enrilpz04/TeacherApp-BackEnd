const db = require('../sql/db.js');

exports.getTeacher = (request, response) => {
    console.log('http://localhost:3000/api/user?email=EMAIL&password=PASSWORD');
    if (request.query.email != null && request.query.password != null) {
        db.query(
            'select * from teach4app.profesores pro inner join teach4app.usuarios usu ON usu.id = pro.usuario_id WHERE usu.email = ' + request.query.email + ';',
             (error, resultado) => {
                if (error) {
                    response.json("Error");
                } else if (resultado.length == 1) {
                    response.json(resultado[0]);
                } else {
                    response.json("Error");
                }
             }
        );
    } else {
        response.json("Error");
    }
};
