'use strict';

var config = require('../config/config');

//autenticacion
const jwt = require('jsonwebtoken');

module.exports = function (router) {


    router.get('/', function (req, res) {

        res.json({
            saludo: 'mostrar Vision y mision de la aplicacion movil.'
        });

    });

    router.post('/autenticar', (req, res) => {

        const { usuario, contrasena } = req.body;

        if (usuario === "osuna" && contrasena === "osuna123") {   //hacer la busqueda del usuario en la base de datos 

            const payload = {
                check: true
            };

            const token = jwt.sign(payload, config.llave, {  //payload -> lo que voy a guardar  -  config.llave -> palabra secreta
                expiresIn: 1440     //tiempo de expiracion de la clave 24 horas
            });

            res.json({
                mensaje: 'Autenticación correcta',
                token: token
            });

        } else {

            res.json({
                mensaje: "Usuario o contraseña incorrectos"
            });
        }
    });

    router.post('/registrar', (req, res) => {

    });
}
