module.exports = (req) => {
    const consultarToken = require('../../../token/consultarToken');
    let now = new Date(); // Posible mapeo adicional
    const token = req.headers['token'];
    if(!token) return null;
    return {
        data: {
            fecha: now,
            estado: 3, //estado 'pendiente'
            idUsuario: consultarToken({ token: token })
        }
    };
};