'use strict';
const usuario = require('./usuario');
const producto = require('./producto');

module.exports = function (router) {

    router.get('/', function (req, res) {

        res.json({
            saludo: 'mostrar Vision y mision de la aplicacion movil.'
        });

    });

    //usuarios
    router.post('/usuario/autenticar', usuario.login);
    router.post('/usuario/registrar', usuario.Registrar);

    //productos
    router.post('/producto/crear',producto.CrearP);
    router.put('/producto/editar/:id',producto.EditarP);
    router.delete('/producto/eliminar/:id',producto.EliminarP);
    router.get('/producto/listar',producto.ListarP);
    
}
