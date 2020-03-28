module.exports = (cabecera) => {
    const jwt = require('jsonwebtoken');
    const keyToken = 'D4Ar51aWbT';
    const user = jwt.verify(cabecera.cabecera, keyToken, (err, data) => {
        return user.id_usuario;
    });
};

