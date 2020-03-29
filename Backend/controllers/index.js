'use strict';
const jwt = require('jsonwebtoken');
const producto = require('./producto');
const sucursal = require('./sucursal');

module.exports = function (router) {

    router.get('/', function (req, res) {

        res.json({
            saludo: 'mostrar Vision y mision de la aplicacion movil.'
        });

    });

    //sucursales
    router.post('/sucursal/crear', ValidarToken, sucursal.Crear);          //validar token de administrador
    router.put('/sucursal/editar/:id', ValidarToken, sucursal.Editar);
    router.delete('/sucursal/eliminar/:id', ValidarToken, sucursal.Eliminar);
    router.get('/sucursal/listar', LoginExistente, sucursal.Listar);

    //vistas de productos
    router.get('/producto/buscar', producto.buscarProducto);
    router.get('/producto/topProductos', producto.topProductos);
    router.get('/producto/topCategorias', producto.topCategorias);
    router.get('/producto/recienIngreso', producto.recienIngreso);
    router.get('/producto/masVendido', producto.masVendido);
    router.get('/producto/top6Departamento', producto.top6Departamento);
    router.get('/producto/top6MasBuscado', producto.top6MasBuscado);
    router.post('/producto/reserva', producto.reserva);





    function ValidarToken(req, res, next) {
        const cabecera = req.headers['token'];
        console.log('el token es: ' + cabecera);
        if (typeof cabecera !== 'undefined') {
            //quitamos la palabra bearer 
            // const portador = cabecera.split(' ');
            const token = cabecera;
            req.token = token;

            /* verificar que el token de un administrador este haciendo la peticion */
            jwt.verify(req.token, '@administrador123@', (err, data) => {
                if (err) {
                    res.json({
                        status: 403,
                        mensaje: 'no es administrador'

                    });
                } else {
                    console.log(data);
                    next();
                }
            });

        } else {
            //no existe token
            res.json({
                //no permitido
                status: 403,
                mesanje: 'no permitido'
            });
        }
    }

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
