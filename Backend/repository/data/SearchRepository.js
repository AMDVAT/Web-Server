class SearchRepository {
    constructor(opts) {
        this.SearchDataRepository = opts.SearchDataRepository;
        this.ProductDataRepository = opts.ProductDataRepository;
        this.CategoriaDataRepository = opts.CategoriaDataRepository;
    }

    async crearProductoBusqueda(data) {
        for (const producto of data.productos) {
            await this.SearchDataRepository
                .create({
                    idProducto: producto.id_producto
                    , idUsuario: data.idUsuario || null
                    , fecha: new Date()
                });
        }
    }

    async listarProductosMasBuscados() {
        const fechaFiltro = new Date();
        fechaFiltro.setDate(fechaFiltro.getDate() - 7);
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            // Listado de productos ordenados alfabeticamente
            response.data = await this.SearchDataRepository.findAll({
                raw: true,
                attributes: {
                    include: [
                        [this.ProductDataRepository.sequelize.col('producto.id_producto'), 'id_producto'],
                        [this.ProductDataRepository.sequelize.col('producto.nombre'), 'nombre'],
                        [this.ProductDataRepository.sequelize.col('producto.descripcion'), 'descripcion'],
                        [this.ProductDataRepository.sequelize.col('producto.precio'), 'precio'],
                        [this.ProductDataRepository.sequelize.col('producto.estado'), 'estado'],
                        [this.ProductDataRepository.sequelize.col('producto.precio_oferta'), 'precio_oferta'],
                        [this.ProductDataRepository.sequelize.col('producto.calificacion'), 'calificacion'],
                        [this.ProductDataRepository.sequelize.col('producto.foto'), 'foto'],
                        [this.ProductDataRepository.sequelize.col('producto.id_categoria'), 'id_categoria'],
                        [this.CategoriaDataRepository.sequelize.col('producto.categoria.nombre'), 'nombre_categoria'],
                        [this.SearchDataRepository.sequelize.fn('COUNT'
                            , this.SearchDataRepository.sequelize.col('busqueda.id_producto'))
                        , 'cantidadProductoBuscado']
                    ],
                    exclude: [
                        'idProducto',
                        'idBusqueda',
                        'fecha',
                        'idUsuario'
                    ]
                },
                include: [{
                    model: this.ProductDataRepository,
                    required: true,
                    include: [{
                        model: this.CategoriaDataRepository,
                        required: true,
                        attributes: []
                    }],
                    attributes: []
                }],
                where: {
                    fecha: {
                        gte: fechaFiltro
                    }
                },
                order: [[this.SearchDataRepository.sequelize.literal('cantidadProductoBuscado'), 'DESC'],
                    [this.ProductDataRepository.sequelize.literal('nombre'), 'ASC']
                ],
                group: ['busqueda.id_producto'],// ,'nombre', 'descripcion', 'precio','estado','precio_oferta', 'calificacion', 'foto', 'id_categoria', 'nombre_categoria'],
                limit: 10
            });
        } catch (error) {
            response.data = error;
            response.success = false;
            response.message = 'Error al obtener productos, intente mas tarde.';
        }
        return response;
    }
}

module.exports = SearchRepository;