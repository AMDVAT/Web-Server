'use strict';
const jwt = require('jsonwebtoken');
const usuario = require('./usuario');
const producto = require('./producto');
const sucursal = require('./sucursal');

module.exports = function (router) {

    router.get('/', function (req, res) {

        res.json({
            saludo: 'mostrar Vision y mision de la aplicacion movil.'
        });

    });

    //usuarios
    router.post('/usuario/autenticar', LoginExistente, usuario.login);
    router.post('/usuario/registrar', LoginExistente, usuario.Registrar);
    router.put('/usuario/editar/:id', ValidarToken, usuario.EditarU);
    router.delete('/usuario/eliminar/:id', ValidarToken, usuario.EliminarU);
    router.get('/usuario/listar', LoginExistente, usuario.ListarU);
    //productos
    router.post('/producto/crear', ValidarToken, producto.CrearP);          //validar token de administrador
    router.put('/producto/editar/:id', ValidarToken, producto.EditarP);
    router.delete('/producto/eliminar/:id', ValidarToken, producto.EliminarP);
    router.get('/producto/listar', LoginExistente, producto.ListarP);
    router.post('/producto/crearCategoria', ValidarToken, producto.crearCategoria);
    //sucursales
    router.post('/sucursal/crear', ValidarToken, sucursal.Crear);          //validar token de administrador
    router.put('/sucursal/editar/:id', ValidarToken, sucursal.Editar);
    router.delete('/sucursal/eliminar/:id', ValidarToken, sucursal.Eliminar);
    router.get('/sucursal/listar', LoginExistente, sucursal.Listar);

    //vistas de productos
    router.get('/producto/listaCategorias', producto.ListaCategorias);
    router.get('/producto/buscar/:categoria', producto.buscarCategoria);
    router.get('/producto/buscar/:nombre', producto.buscarNombre);
    router.get('/producto/recienIngreso', producto.recienIngreso);
    router.get('/producto/masVendido', producto.masVendido);
    router.get('/producto/masVendido', producto.masVendido);
    router.get('/producto/top6Departamento', producto.top6Departamento);
    router.get('/producto/top6MasBuscado', producto.top6MasBuscado);
    router.post('/producto/reserva', producto.reserva);





    function ValidarToken(req, res, next) {

        const cabecera = req.headers['token'];
        console.log('el token es: ' + cabecera);
        if (typeof cabecera !== 'undefined') {
            //quitamos la palabra bearer 
            const portador = cabecera.split(' ');
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
