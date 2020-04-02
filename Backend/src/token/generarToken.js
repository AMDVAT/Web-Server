module.exports = (payload) => {
    const keyToken = process.env.keyToken;
    const jwt = require('jsonwebtoken');
    return jwt.sign(payload
        , keyToken, {                                                    //{id}  -  llave -> palabra secreta
            expiresIn: 86400                                                 //tiempo de expiracion de la clave 24 horas
        });
};