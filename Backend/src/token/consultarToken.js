module.exports = (token) => {
    console.log(token.token);
    const jwt = require('jsonwebtoken');
    const keyToken = 'D4Ar51aWbT';
    const user = jwt.verify(token.token, keyToken);
    return user.id_usuario;
};

