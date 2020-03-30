class CategoryRepository {
    constructor(opts) {
        this.CategoriaDataRepository = opts.CategoriaDataRepository;
    }

    async buscarCategoria(params) {
        const id_categoria = params.id;
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            // Listado de categorias ordenados alfabeticamente
            response.data = await this.CategoriaDataRepository.findOne({
                order: [['nombre', 'ASC']],
                where: { id_categoria }
            });
            if(!response.data) response.message = 'No se ha podido encontrar el elemento solicitado.';
        } catch (error) {
            response.success = false;
            response.message = 'Error al obtener categorias, intente mas tarde.';
        }
        return response;
    }

    async listarCategorias(padre = false) {
        const response = {
            data: null,
            message: null,
            success: true
        };
        const params = {
            order: [['nombre', 'ASC']]
        };
        if(padre) params.where = { categoria_id_categoria: { is: null} };
        try {
            // Listado de categorias ordenados alfabeticamente
            response.data = await this.CategoriaDataRepository.findAll(params);
        } catch (error) {
            response.success = false;
            response.message = 'Error al obtener categorias, intente mas tarde.';
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
            response.message = 'Error al obtener categorias, intente mas tarde.';
        }
        return response;
    }

    async crearCategoria(body) {
        const categoria = {
            nombre: body.nombre,
            descripcion: body.descripcion,
            categoria_id_categoria: body.categoria_id_categoria,
        };
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.CategoriaDataRepository.create(categoria);
            response.message = 'Categoria creada correctamente.';
        } catch (error) {
            response.success = false;
            response.message = 'Error al crear una categoria, intente mas tarde.';
        }
        return response;
    }

    async editarCategoria(body, params) {
        const id_categoria = params.id;
        const categoria = {
            nombre: body.nombre,
            descripcion: body.descripcion,
            categoria_id_categoria: body.categoria_id_categoria,
        };
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.CategoriaDataRepository.update(categoria, { where: { id_categoria } });
            response.message = 'Categoria actualizada correctamente.';
        } catch (error) {
            response.success = false;
            response.message = 'Error al actualizar la categoria, intente mas tarde.';
        }
        return response;
    }

    async eliminarCategoria(params) {
        const id_categoria = params.id;
        const producto = {
            estado: 2,
        };
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.CategoriaDataRepository.update(producto, { where: { id_categoria } });
            response.message = 'Categoria eliminada correctamente.';
        } catch (error) {
            response.success = false;
            response.message = 'Error al eliminar la categoria, intente mas tarde.';
        }
        return response;
    }
}
module.exports = CategoryRepository;