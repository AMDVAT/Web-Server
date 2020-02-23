'use strict';
const jwt = require('jsonwebtoken');
const usuario = require('./usuario');
const producto = require('./producto');

module.exports = function (router) {

    router.get('/', function (req, res) {

        res.json({
            saludo: 'mostrar Vision y mision de la aplicacion movil.'
        });

    });

    //usuarios
    router.post('/usuario/autenticar', LoginExistente, usuario.login);
    router.post('/usuario/registrar', LoginExistente, usuario.Registrar);

    //productos
    router.post('/producto/crear', ValidarToken, producto.CrearP);          //validar token de administrador
    router.put('/producto/editar/:id', ValidarToken, producto.EditarP);
    router.delete('/producto/eliminar/:id', ValidarToken, producto.EliminarP);
    router.get('/producto/listar', LoginExistente, producto.ListarP);



    function ValidarToken(req, res, next) {

        const cabecera = req.headers['token'];
        console.log("el token es: " + cabecera);
        if (typeof cabecera !== 'undefined') {
            //quitamos la palabra bearer 
            const portador = cabecera.split(" ");
            const token = cabecera;
            req.token = token;

            /* verificar que el token de un administrador este haciendo la peticion */
            jwt.verify(req.token,'@administrador123@', (err,data) =>{
                if(err){
                    res.json({
                        status: 403,
                        mensaje: "no es administrador"
                    
                    });
                }else{
                    console.log(data);
                    next();
                }
            });
            
        } else {
            //no existe token
            res.json({
                //no permitido
                status: 403,
                mesanje: "no permitido"
            })
        }
    }
    
    function LoginExistente(req, res, next) {

        //verifico si ya trae un token si no si se permite el acceso a login de lo contrario 
        const cabecera = req.headers['token'];
        console.log("el token es: " + cabecera);
        if (typeof cabecera !== 'undefined') {

            res.json({
                //no permitido
                status: 403,
                mesanje: "ya tiene sesion iniciada."
            })

        } else {
            next();
        }
    }
}
