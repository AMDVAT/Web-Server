'use strict';

const jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('imagen_producto');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.envCLOUD_API_SECRET
});

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
    try {
        upload(req, res, function (err) {
            if (err) {
                res.status(400).send({ mensaje: 'Ingreso fallido.' });
            }
            else {
                cloudinary.uploader
                    .upload_stream({ resource_type: 'auto' }, async (error, result) => {
                        let urlImagen = null;
                        let mensajeRegistro = null;
                        if (error) mensajeRegistro = 'El producto se guardo correctamente, pero la imagen no pudo ser almacenada.';
                        if (result) urlImagen = result.url;
                        const data = await req.container.resolve('ProductRepository').crearProducto(req.body, { urlImagen });
                        const { data: producto } = data;
                        let statusCode = 400;
                        if(data.success && producto) {
                            statusCode = 200;
                            if(!urlImagen) {
                                data.message = mensajeRegistro;
                            }
                        }
                        res.status(statusCode).send({ mensaje: data.message });
                    })
                    .end(req.file.buffer);
            }
        });
    } catch (error) {
        res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
    }
}

producto.EditarP = async (req, res) => {
    try {
        const data = await req.container.resolve('ProductRepository').editarProducto(req.body, req.params);
        const { data: producto } = data;
        let statusCode = 400;
        if (data.success && producto) {
            statusCode = 200;
        }
        res.status(statusCode).send({ mensaje: data.message });
    } catch (error) {
        res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
    }
}

producto.EliminarP = async (req, res) => {
    try {
        const data = await req.container.resolve('ProductRepository').eliminarProducto(req.params);
        const { data: producto } = data;
        let statusCode = 400;
        if (data.success && producto) {
            statusCode = 200;
        }
        res.status(statusCode).send({ mensaje: data.message });
    } catch (error) {
        res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
    }
}

producto.ListarP = async (req, res) => {
    try {
        const data = await req.container.resolve('ProductRepository').listarProductos();
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
}

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
}

producto.ListaCategorias = async (req, res) => {
    try {
        const data = await req.container.resolve('CategoryRepository').listarCategorias();
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
}

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
}

producto.buscarProducto = async (req, res) => {
    try {
        const data = await req.container.resolve('ProductRepository').buscarProducto(req.query);
        const { data: productos } = data;
        if (data.success && productos) {
            res.send(productos);
        }
        else {
            res.status(400).send({ mensaje: data.message });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
    }
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