'use strict';
const producto = require('./producto');

module.exports = function (router) {

    router.get('/', function (req, res) {

        res.json({
            saludo: 'Mostrar vision y mision de la aplicacion movil.',
            mensaje: 'Esta es una prueba de CI/CD'
        });

    });

    //vistas de productos
    router.get('/producto/topProductos', producto.topProductos);
    router.get('/producto/topCategorias', producto.topCategorias);
    router.get('/producto/recienIngreso', producto.recienIngreso);
    router.get('/producto/masVendido', producto.masVendido);
    router.get('/producto/top6Departamento', producto.top6Departamento);
    router.get('/producto/top6MasBuscado', producto.top6MasBuscado);
    router.post('/producto/reserva', producto.reserva);

    function LoginExistente(req, res, next) {

        //verifico si ya trae un token si no si se permite el acceso a login de lo contrario 
        const cabecera = req.headers['token'];
        console.log('el token es: ' + cabecera);
        if (typeof cabecera !== 'undefined') {

            res.json({
                //no permitido
                status: 403,
                mesanje: 'ya tiene sesion iniciada.'
            });

        } else {
            next();
        }
    }
};
