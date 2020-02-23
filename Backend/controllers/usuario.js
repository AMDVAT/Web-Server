'use strict';

const jwt = require('jsonwebtoken');

const usuario = {}

usuario.login = (req, res) => {

    const { nombre, contrasena } = req.body;

    //hacemos la consulta a la base de datos o servicio de donde se consumira.
    const usuario = { id: 1, nombre: "osuna", contrasena: "osuna123", tipoUs: 1 }
    //const id = usuario.id;
    if (nombre === usuario.nombre && contrasena === usuario.contrasena) {      //hacer la busqueda del usuario en la base de datos 

        var token = {};
        if (usuario.tipoUs == 1) {                                              //tipo de usuario administrador
            token = jwt.sign({nombre}, '@administrador123@', {                //{id}  - llave -> palabra secreta
                expiresIn: 1440                                                 //tiempo de expiracion de la clave 24 horas
            });

            res.json({
                status: 200,
                token:token,
                mensaje: "administrador"

            });
        } else {
            token = jwt.sign({nombre}, '@Usuario123@', {                      //{id}  -  llave -> palabra secreta
                expiresIn: 1440                                                 //tiempo de expiracion de la clave 24 horas
            });

            res.json({
                status: 200,
                token: token,
                mensaje: "usuario"

            });
        }

    } else {

        res.json({
            status: "403",
            mensaje: "credenciales incorrectas"
        });
    }
};

usuario.Registrar = (req, res) => {

    const { nombre } = req.body.nombre;

    const User = {

        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contrasena: req.body.password,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        tipoUs: req.body.tipoUs

    };

    //insertar usuario a la base de datos
    var token = {}
    if (User.tipoUs == 1) {   //tipo de usuario administrador
         token = jwt.sign({nombre}, '@administrador123@', {          //{nombre}  - llave -> palabra secreta
            expiresIn: 1440                                      //tiempo de expiracion de la clave 24 horas
        });
    } else {
        token  = jwt.sign({ nombre }, '@Usuario123@', {          //{nombre}  -  llave -> palabra secreta
            expiresIn: 1440                                      //tiempo de expiracion de la clave 24 horas
        });
    }

    res.json({
        status: "200",
        token: token
    });
};

usuario.Editar = (req, res) => {


};

module.exports = usuario;