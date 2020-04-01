module.exports = (body) => {
    const consultarToken = require('../../../token/consultarToken');
    let now = new Date();
    const token = req.headers['token'];
    return {
        data: {
            id_usuario: consultarToken({ token: token }),
            id_producto: body.id_producto,
            id_estado: 1, //estado: 'pendiente'
            fecha: now
        }
    };
};