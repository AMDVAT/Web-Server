module.exports = (payload) => {
    const jwt = require('jsonwebtoken');
    const keyToken = 'D4Ar51aWbT';
    return jwt.sign(payload
        , keyToken, {                                                    //{id}  -  llave -> palabra secreta
            expiresIn: 1440                                                 //tiempo de expiracion de la clave 24 horas
        });
};