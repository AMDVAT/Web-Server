'use strict';

var config = require('../config/config');
const jwt = require('jsonwebtoken');

const usuario = {}

usuario.login = (req, res) => {

    const { nombre, contrasena } = req.body;

    if (nombre === "osuna" && contrasena === "osuna123") {      //hacer la busqueda del usuario en la base de datos 

        const token = jwt.sign({ nombre }, config.llave, {          //{nombre}  -  config.llave -> palabra secreta
            expiresIn: 1440                                      //tiempo de expiracion de la clave 24 horas
        });

        res.json({
            mensaje: "200",
            token: token
        });

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

    const token = jwt.sign({ nombre }, config.llave, {          //{nombre}  -  config.llave -> palabra secreta
        expiresIn: 1440                                      //tiempo de expiracion de la clave 24 horas
    });

    res.json({
        status: "200",
        token: token
    });
};

usuario.Editar = (req,res) =>{
    

};

module.exports = usuario;