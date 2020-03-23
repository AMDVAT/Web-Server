'use strict';

const jwt = require('jsonwebtoken');

const usuario = {};

usuario.login = async (req, res) => {
    try {
        //hacemos la consulta a la base de datos o servicio de donde se consumira.
        const data = await req.container.resolve('UserRepository').inicioSesion(req.body);
        const { data: usuario } = data;
        if (data.success && usuario) {      //hacer la busqueda del usuario en la base de datos 
            let keyToken = null;
            let mensaje = null;
            if (usuario.tipo_usuario == 1) {
                mensaje = 'administrador';                                         //tipo de usuario administrador
                keyToken = '@administrador123@';
            } else {
                mensaje = 'usuario';
                keyToken = '@Usuario123@';
            }
            const token = jwt.sign({ email: usuario.email, tipoUsuario: usuario.tipo_usuario }
                , keyToken, {                                                    //{id}  -  llave -> palabra secreta
                    expiresIn: 1440                                                 //tiempo de expiracion de la clave 24 horas
                });
            res.send({
                token: token,
                mensaje: mensaje
            });
        } else {
            res.status(400).send({ mensaje: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensaje: 'No se pudo obtener los datos.' });
    }

};

usuario.Registrar = async (req, res) => {
    try {
        const data = await req.container.resolve('UserRepository').crearUsuario(req.body);
        const { data: usuario } = data;
        let statusCode = 400;
        if (data.success && usuario) {
            statusCode = 200;
        }
        res.status(statusCode).send({ mensaje: data.message });
    } catch (error) {
        res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
    }
};

usuario.EditarU = async (req, res) => {
    try {
        const data = await req.container.resolve('UserRepository').editarUsuario(req.body, req.params);
        const { data: usuario } = data;
        let statusCode = 400;
        if (data.success && usuario) { // usuario.email
            statusCode = 200;
        }
        res.status(statusCode).send({ mensaje: data.message });
    } catch (error) {
        res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
    }
};

usuario.EliminarU = async (req, res) => {
    try {
        const data = await req.container.resolve('UserRepository').eliminarUsuario(req.params);
        const { data: usuario } = data;
        let statusCode = 400;
        if (data.success && usuario) { // usuario.email
            statusCode = 200;
        }
        res.status(statusCode).send({ mensaje: data.message });
    } catch (error) {
        res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
    }
};

usuario.ListarU = async (req, res) => {
    try {
        const data = await req.container.resolve('UserRepository').listaUsuarios();
        const { data: usuario } = data;
        if (data.success && usuario) {
            res.send(usuario);
        }
        else {
            res.status(400).send({ mensaje: data.message });
        }
    } catch (error) {
        res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
    }
};

module.exports = usuario;