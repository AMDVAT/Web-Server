'use strict';

const jwt = require('jsonwebtoken');

const producto = {}

producto.CrearP = async (req, res) => {
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
producto.EditarP = async (req, res) => {
    
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
producto.EliminarP = async (req, res) => {

    //eliminar el producto con el id especificado
    console.log(req.params.id);

    res.json({
        status: 200
    });
}
producto.ListarP = async (req, res) => {

    //arreglos de objetos productos   select *, categoria.Nombre, categoria.id From productos, categoria
    res.json("productos existentes");
}

producto.ListaCategorias = async (req, res) => {

    //listar categorias id,nombre 
    res.json(/* resultado de la consulta */);
}
producto.buscarCategoria = async (req, res) => {

    //listar productos de categoria especificada en los parametros req.params.categoria
    res.json(/* resultado de la consulta */);
}
producto.buscarNombre = async (req, res) => {

    //listar productos de categoria especificada en los parametros req.params.nombre
    res.json(/* resultado de la consulta */);
}
producto.recienIngreso = async (req, res) => {

    //listar productos de recien ingreso
    res.json(/* resultado de la consulta */);
}
producto.masVendido = async (req, res) => {

    //listar productos mas vendiddos
    res.json(/* resultado de la consulta */);
}
/*
producto.top6Departamento = async (req, res) => {

    //listar productos top 6 d elos departamentos
    res.json( resultado de la consulta );
}
producto.top6MasBuscado = async (req, res) => {

    //listar productos top 6 d elos departamentos
    res.json( resultado de la consulta );
}*/
module.exports = producto;