module.exports = (token) => {
    const jwt = require('jsonwebtoken');
    const keyToken = process.env.keyToken;
    const user = jwt.verify(token.token, keyToken);
    return user.idUsuario;
};

