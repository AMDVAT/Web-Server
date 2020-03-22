'use strict';

const jwt = require('jsonwebtoken');

const producto = {}

producto.crearCategoria = async (req, res) => {
    var categoria = {
        nombre: req.body.nombre,
        descripcion: req.nody.descripcion,
        categoria_id_categoria: req.body.categoria
    }

    //insert

    res.json({
        status: "200",
        mensaje: "se creo la categoria."
    });
}

producto.CrearP = async (req, res) => {
    const product = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        status: req.body.status,
        precio_oferta: req.body.precio_oferta,
        foto: req.body.foto,
        calificacion: req.body.calificacion,
        categoria_id_categoria: req.body.categoria
    }
    //console.log('entro00000');
    console.log(product);
    res.json({
        status: "200",
        mensaje: "se creo el producto."
    });
}
producto.EditarP = async (req, res) => {
    const id_producto = req.params.id;
    const product = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        status: req.body.status,
        precio_oferta: req.body.precio_oferta,
        foto: req.body.foto,
        calificacion: req.body.calificacion,
        categoria_id_categoria: req.body.categoria
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
    try {
        const data = await req.container.resolve('ProductRepository').listarProductos();
        const { data: usuario } = data;
        if (data.success && usuario) {
            res.send(usuario);
        }
        else {
            res.status(400).send({ mensaje: data.message });
        }
    } catch (error) {
        res.status(500).send('No se pudo completar la solicitud');
    }
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

producto.top6Departamento = async (req, res) => {

    //listar productos top 6 d elos departamentos
    res.json( /*resultado de la consulta*/);
}
producto.top6MasBuscado = async (req, res) => {

    //listar productos top 6 d elos departamentos
    res.json( /*resultado de la consulta*/);
}
producto.reserva = async (req, res) => {
    const { id_producto, id_usuario } = req.body;

    //insercion a la reservacion pero no se que tabla xd
}
module.exports = producto;