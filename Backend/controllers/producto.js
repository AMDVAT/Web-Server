'use strict';

const jwt = require('jsonwebtoken');

const producto = {}

producto.CrearP = (req, res) => {
    const product = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        categoria: req.body.categoria
    }
    //console.log('entro00000');
    console.log(product);
    res.json({
        status: "200",
        mensaje: "se creo el producto."
    });
}
producto.EditarP = (req, res) => {
    
    const product = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        categoria: req.body.categoria
    }

    //editar producto con el id especificado
    console.log(req.params.id);

    res.json({
        status: 200
    });
}
producto.EliminarP = (req, res) => {

    //eliminar el producto con el id especificado
    console.log(req.params.id);

    res.json({
        status: 200
    });
}
producto.ListarP = (req, res) => {

    res.send("productos existentes");
}


module.exports = producto;