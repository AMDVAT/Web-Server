'use strict';


const sucursal = {};

sucursal.Crear = async (req, res) => {
    const sucursal = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        numero: req.body.numero
    };
    //insert
    res.json({
        status: '200',
        mensaje: 'se creo la sucursal.'
    });
};
sucursal.Editar = async (req, res) => {
    const id_sucursal = req.params.id;
    const sucursal = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        numero: req.body.numero
    };

    //editar producto con el id especificado
    console.log(req.params.id);

    res.json({
        status: 200
    });
};
sucursal.Eliminar = async (req, res) => {

    //eliminar el producto con el id especificado
    console.log(req.params.id);

    res.json({
        status: 200
    });
};
sucursal.Listar = async (req, res) => {

    //arreglos de objetos productos   select *, categoria.Nombre, categoria.id From productos, categoria
    res.json('sucursales existentes');
};

module.exports = sucursal;