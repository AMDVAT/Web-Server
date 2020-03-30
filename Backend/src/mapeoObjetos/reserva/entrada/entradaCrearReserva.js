module.exports = (req) => {
    const consultarToken = require('../../../token/consultarToken');
    let now = new Date();
    const token = req.headers['token'];
    return {
        data: {
            fecha: now,
            estado: 3, //estado 'pendiente'
            id_usuario: consultarToken({ token: token })
        }
    };
};