module.exports = (req, res, next) => {
    const keyToken = 'D4Ar51aWbT';
    const jwt = require('jsonwebtoken');
    const cabecera = req.headers['token'];
    if (typeof cabecera !== 'undefined') {
        const token = cabecera;
        req.token = token;

        /* verificar que el token de un administrador este haciendo la peticion */
        jwt.verify(req.token, keyToken, (err) => {
            if (err) {
                res.json({
                    status: 403,
                    mensaje: 'Token no valido.'
                });
            } else {
                next();
            }
        });
    } else {
        //no existe token
        res.json({
            //no permitido
            status: 403,
            mesanje: 'Acceso permitido.'
        });
    }
};
