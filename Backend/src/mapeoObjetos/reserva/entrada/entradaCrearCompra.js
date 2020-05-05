module.exports = (req) => {
    const consultarToken = require('../../../token/consultarToken');
    let now = new Date(); // Posible mapeo adicional
    const token = req.headers['token'];
    if(!token) return null;
    return {
        data: {
            fecha: now,
            estado: 1, //estado 'pendiente'
            id_usuario: consultarToken({ token: token })
        }
    };
};