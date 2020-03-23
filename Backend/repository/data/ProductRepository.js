class ProductRepository {
    constructor(opts) {
        this.ProductDataRepository = opts.ProductDataRepository;
        this.CategoriaDataRepository = opts.CategoriaDataRepository;
    }

    async listarProductos() {
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            // Listado de productos ordenados alfabeticamente
            response.data = await this.ProductDataRepository.findAll({
                raw: true,
                attributes: {
                    include: [[this.CategoriaDataRepository.sequelize.col('categoria.nombre'), 'nombre_categoria']]
                },
                include: {
                    model: this.CategoriaDataRepository,
                    required: true,
                    attributes: []
                },
                order: [['nombre', 'ASC']]
            });
        } catch (error) {
            response.success = false;
            response.message = 'Error al obtener productos, intente mas tarde.'
        }
        return response;
    }

    async crearProducto(body, params) {
        const producto = {
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            precio_oferta: body.precio_oferta,
            id_categoria: body.id_categoria,
            foto: params.urlImagen,
            calificacion: 0,
            estado: 1,
        };
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.ProductDataRepository.create(producto);
            response.message = 'Producto creado correctamente.'
        } catch (error) {
            response.success = false;
            response.message = 'Error al crear un producto, intente mas tarde.'
        }
        return response;
    }

    async editarProducto(body, params) {
        const id_producto = params.id;
        const producto = {
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            precio_oferta: body.precio_oferta,
            id_categoria: body.id_categoria,
            estado: body.estado,
        };
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.ProductDataRepository.update(producto, { where: { id_producto } });
            response.message = 'Producto actualizado correctamente.'
        } catch (error) {
            response.success = false;
            response.message = 'Error al actualizar un producto, intente mas tarde.'
        }
        return response;
    }

    async eliminarProducto(params) {
        const id_producto = params.id;
        const producto = {
            estado: 2,
        };
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.ProductDataRepository.update(producto, { where: { id_producto } });
            response.message = 'Producto eliminado correctamente.'
        } catch (error) {
            response.success = false;
            response.message = 'Error al eliminar el producto, intente mas tarde.'
        }
        return response;
    }

    async buscarProducto(query) {
        const { nombre, id_categoria } = query;
        const response = {
            data: null,
            message: null,
            success: true
        };
        // definicion de parametros de busqueda
        if (!nombre && !id_categoria) {
            response.success = false;
            response.message = 'No existen parametros para poder realizar la busqueda.';
            return response;
        }
        const filtroProducto = {};
        if (nombre) {
            filtroProducto.nombre = {
                like: `%${nombre}%`
            }
        }
        if (id_categoria) {
            filtroProducto.id_categoria = id_categoria;
        }
        try {
            response.data = await this.ProductDataRepository.findAll({
                raw: true,
                attributes: {
                    include: [[this.CategoriaDataRepository.sequelize.col('categoria.nombre'), 'nombre_categoria']]
                },
                include: {
                    model: this.CategoriaDataRepository,
                    required: true,
                    attributes: []
                },
                order: [['nombre', 'ASC']],
                where: { ...filtroProducto }
            });
            response.message = 'Producto eliminado correctamente.'
        } catch (error) {
            response.success = false;
            response.message = 'Error al eliminar el producto, intente mas tarde.'
        }
        return response;
    }

    async topProductos() {
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            // Listado de productos ordenados alfabeticamente
            response.data = await this.ProductDataRepository.findAll({
                raw: true,
                attributes: {
                    include: [[this.CategoriaDataRepository.sequelize.col('categoria.nombre'), 'nombre_categoria']]
                },
                include: {
                    model: this.CategoriaDataRepository,
                    required: true,
                    attributes: []
                },
                order: [['nombre', 'ASC']],
                limit: 6
            });
        } catch (error) {
            response.success = false;
            response.message = 'Error al obtener productos, intente mas tarde.'
        }
        return response;
    }
}

module.exports = ProductRepository;