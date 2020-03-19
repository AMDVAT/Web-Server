'use strict';

const jwt = require('jsonwebtoken');

const usuario = {};

usuario.login = async (req, res) => {
    try {

        const { email, contrasena } = req.body;
        //hacemos la consulta a la base de datos o servicio de donde se consumira.
        const Usuario = req.db.models.usuario;
        const data = await Usuario.findOne({ where: { email: email || null, password: contrasena || null } });
        if (data) {      //hacer la busqueda del usuario en la base de datos 

            var token = {};
            if (data.tipo_usuario == 1) {                                              //tipo de usuario administrador
                token = jwt.sign({ email }, '@administrador123@', {                //{id}  - llave -> palabra secreta
                    expiresIn: 1440                                                 //tiempo de expiracion de la clave 24 horas
                });

                res.send({
                    token: token,
                    mensaje: 'administrador'
                });
            } else {
                token = jwt.sign({ email }, '@Usuario123@', {                      //{id}  -  llave -> palabra secreta
                    expiresIn: 1440                                                 //tiempo de expiracion de la clave 24 horas
                });

                res.send({
                    token: token,
                    mensaje: 'usuario'
                });
            }

        } else {
            res.status(400).send('Credenciales incorrectas');
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('No se pudo obtener los datos.');
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
    var token = {};
    if (User.tipoUs == 1) {   //tipo de usuario administrador
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

    const usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contrasena: req.body.password,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        tipoUs: req.body.tipoUs
    };

    //editar usuario con el id especificado
    console.log(req.params.id);

    res.json({
        status: 200
    });
};

usuario.EliminarU = (req, res) => {

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