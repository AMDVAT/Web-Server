'use strict';

const producto = {};

producto.topProductos = async (req, res) => {
    try {
        const data = await req.container.resolve('ProductRepository').topProductos();
        const { data: productos } = data;
        if (data.success && productos) {
            res.send(productos);
        }
        else {
            res.status(400).send({ mensaje: data.message });
        }
    } catch (error) {
        res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
    }
};

producto.topCategorias = async (req, res) => {
    try {
        const data = await req.container.resolve('CategoryRepository').topCategorias();
        const { data: productos } = data;
        if (data.success && productos) {
            res.send(productos);
        }
        else {
            res.status(400).send({ mensaje: data.message });
        }
    } catch (error) {
        res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
    }
};

producto.recienIngreso = async (req, res) => {

    //listar productos de recien ingreso
    res.json(/* resultado de la consulta */);
};
producto.masVendido = async (req, res) => {

    //listar productos mas vendiddos
    res.json(/* resultado de la consulta */);
};

producto.top6Departamento = async (req, res) => {

    //listar productos top 6 d elos departamentos
    res.json( /*resultado de la consulta*/);
};
producto.top6MasBuscado = async (req, res) => {

    //listar productos top 6 d elos departamentos
    res.json( /*resultado de la consulta*/);
};
producto.reserva = async (req, res) => {
    const { id_producto, id_usuario } = req.body;

    //insercion a la reservacion pero no se que tabla xd
};
module.exports = producto;