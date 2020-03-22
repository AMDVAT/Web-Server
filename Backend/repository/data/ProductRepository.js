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
                    include: [[this.ProductDataRepository.sequelize.col('categoria.nombre'), 'nombre_categoria']]
                },
                include: {
                    model: this.CategoriaDataRepository,
                    required: true,
                    attributes: []
                },
                order: [['nombre', 'ASC']]
            });
        } catch (error) {
            console.log(error)
            response.success = false;
            response.message = 'Error al obtener productos, intente mas tarde.'
        }
        return response;
    }
}

module.exports = ProductRepository;