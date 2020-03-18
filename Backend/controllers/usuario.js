'use strict';

const jwt = require('jsonwebtoken');

const usuario = {};

usuario.login = (req, res) => {

    const { nombre, contrasena } = req.body;

    //hacemos la consulta a la base de datos o servicio de donde se consumira.
    const usuario = { id: 1, nombre: 'osuna', password: 'osuna123', tipo_usuario: 1 };   //tipo de usuario 1 administrador
    //const id = usuario.id;
    if (nombre === usuario.nombre && contrasena === usuario.password) {      //hacer la busqueda del usuario en la base de datos 

        var token = {};
        if (usuario.tipo_usuario == 1) {                                              //tipo de usuario administrador
            token = jwt.sign({ nombre }, '@administrador123@', {                //{id}  - llave -> palabra secreta
                expiresIn: 1440                                                 //tiempo de expiracion de la clave 24 horas
            });

            res.json({
                status: 200,
                token: token,
                mensaje: 'administrador'

            });
        } else {
            token = jwt.sign({ nombre }, '@Usuario123@', {                      //{id}  -  llave -> palabra secreta
                expiresIn: 1440                                                 //tiempo de expiracion de la clave 24 horas
            });

            res.json({
                status: 200,
                token: token,
                mensaje: 'usuario'

            });
        }

    } else {

        res.json({
            status: '400',
            mensaje: 'credenciales incorrectas'
        });
    }
};

usuario.Registrar = (req, res) => {

    const { nombre } = req.body.nombre;

    const User = {

        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.contrasena,
        estado: 1,
        tipo_usuario: req.body.tipoUs

    };

    //insertar usuario a la base de datos
    var token = {};
    if (User.tipo_usuario == 1) {   //tipo de usuario administrador
        token = jwt.sign({ nombre }, '@administrador123@', {          //{nombre}  - llave -> palabra secreta
            expiresIn: 1440                                      //tiempo de expiracion de la clave 24 horas
        });
    } else {
        token = jwt.sign({ nombre }, '@Usuario123@', {          //{nombre}  -  llave -> palabra secreta
            expiresIn: 1440                                      //tiempo de expiracion de la clave 24 horas
        });
    }

    res.json({
        status: '200',
        token: token
    });
};

usuario.EditarU = (req, res) => {
    const id_usuario = req.params.id;
    const usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.contrasena,
        estado: 1,
        tipo_usuario: req.body.tipoUs
    };

    //editar usuario con el id especificado
    console.log(req.params.id);

    res.json({
        status: 200
    });
};

usuario.EliminarU = (req, res) => {

    const id_usuario = req.params.id;
    //eliminar el producto con el id especificado
    console.log(req.params.id);

    res.json({
        status: 200
    });
};

usuario.ListarU = async (req, res) => {
    try {
        const Usuario = req.db.models.usuario;
        const data = await Usuario.findAll();
        res.send(data);
    } catch (error) {
        res.status(500).send('No se pudo obtener los datos.');
    }
};

module.exports = usuario;