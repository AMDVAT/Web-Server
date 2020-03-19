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
                    mensaje: 'usuario',
                    data
                });
            }

        } else {
            res.status(400).send('Credenciales incorrectas');
        }
    } catch (error) {
        res.status(500).send('No se pudo obtener los datos.');
    }

};

usuario.Registrar = async (req, res) => {

    try {
        const { email } = req.body.nombre;
        const User = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.contrasena,
            estado: 1,
            tipo_usuario: req.body.tipoUs
        };
        //insertar usuario a la base de datos
        const Usuario = req.db.models.usuario;
        await Usuario.create(User);
        var token = {};
        if (User.tipo_usuario == 1) {   //tipo de usuario administrador
            token = jwt.sign({ email }, '@administrador123@', {          //{nombre}  - llave -> palabra secreta
                expiresIn: 1440                                      //tiempo de expiracion de la clave 24 horas
            });
        } else {
            token = jwt.sign({ email }, '@Usuario123@', {          //{nombre}  -  llave -> palabra secreta
                expiresIn: 1440                                      //tiempo de expiracion de la clave 24 horas
            });
        }
        res.send({
            token: token
        });
    } catch (error) {
        res.status(500).send('No se pudo completar la solicitud');
    }
};

usuario.EditarU = async (req, res) => {
    try {
        const id_usuario = req.params.id;
        const usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.contrasena,
            estado: 1,
            tipo_usuario: req.body.tipoUs
        };
        const Usuario = req.db.models.usuario;
        await Usuario.update(usuario, { where: { id_usuario } });
        res.send('Usuario actualizado.');
    } catch (error) {
        res.status(500).send('No se pudo completar la solicitud');
    }
};

usuario.EliminarU = async (req, res) => {
    try {
        const id_usuario = req.params.id;
        const Usuario = req.db.models.usuario;
        // await Usuario.destroy({ where: { id_usuario } }); // Eliminar registro
        await Usuario.update({ estado: 0 }, { where: { id_usuario } }); // Eliminado logico
        res.send('Usuario eliminado.');
    } catch (error) {
        console.log(error)
        res.status(500).send('No se pudo completar la solicitud');
    }
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