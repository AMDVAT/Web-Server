class CategoryRepository {
    constructor(opts) {
        this.CategoriaDataRepository = opts.CategoriaDataRepository;
    }

    async listarCategorias() {
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            // Listado de categorias ordenados alfabeticamente
            response.data = await this.CategoriaDataRepository.findAll({
                order: [['nombre', 'ASC']]
            });
        } catch (error) {
            response.success = false;
            response.message = 'Error al obtener categorias, intente mas tarde.'
        }
        return response;
    }

    async topCategorias() {
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            // Listado de categorias ordenados alfabeticamente
            response.data = await this.CategoriaDataRepository.findAll({
                order: [['nombre', 'ASC']],
                limit: 6
            });
        } catch (error) {
            response.success = false;
            response.message = 'Error al obtener categorias, intente mas tarde.'
        }
        return response;
    }
}
module.exports = CategoryRepository;