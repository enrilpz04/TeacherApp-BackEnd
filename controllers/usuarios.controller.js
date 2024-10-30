const db = require('../sql/db.js');

exports.getUser = (request, response) => {
    console.log('http://localhost:3000/api/user?email=EMAIL&password=PASSWORD');
    if (request.query.email != null && request.query.password != null) {
        db.query(
            'select * from usuarios where email = \'' + request.query.email + '\''
            + ' and password = \'' + request.query.password + '\';',
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