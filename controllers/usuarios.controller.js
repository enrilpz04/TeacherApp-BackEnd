exports.getUser = (request, response) => {
    if (request.query.email != null && request.query.password != null) {
        response.json("Hola");
    } else {
        response.json("Error");
    }
};
