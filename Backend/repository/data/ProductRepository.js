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
            console.log(error);
            response.success = false;
            response.message = 'Error al crear un producto, intente mas tarde.'
        }
        return response;
    }
}

module.exports = ProductRepository;