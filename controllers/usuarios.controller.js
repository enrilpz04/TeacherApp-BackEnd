const db = require('../sql/db.js');

exports.login = (request, response) => {
    if (request.body.email != null && request.body.password != null) {
        db.query(
            'select * from usuarios where email = \'' + request.body.email + '\''
            + ' and password = \'' + request.body.password + '\';',
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
}