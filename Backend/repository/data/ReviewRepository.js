class ReviewRepository {
    constructor(opts) {
        this.ReviewDataRepository = opts.ReviewDataRepository;
        this.ProductDataRepository = opts.ProductDataRepository;
        this.UserDataRepository = opts.UserDataRepository;
    }

    async crearResena(body) {
        const resena = {
            comentario: body.comentario,
            valoracion: body.valoracion,
            id_usuario: body.id_usuario,
            id_producto: body.id_producto,
        };
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.Re.create(resena);
            response.message = 'Resena creada correctamente.';
        } catch (error) {
            response.success = false;
            response.message = 'Error al crear una resena.';
        }
        return response;
    }

    async resenaDeProducto(query) {
        const { id_producto } = query;
        const response = {
            data: null,
            message: null,
            success: true
        };
        // definicion de parametros de busqueda
        if (!id_producto) {
            response.success = false;
            response.message = 'Falta el parametro del producto del cual se quieren obtener las resenas.';
            return response;
        }
        const filtroProducto = {};
        if (id_producto) {
            filtroProducto.id_producto = id_producto;
        }
        try {
            response.data = await this.ReviewDataRepository.findAll({
                raw: true,
                where: { ...filtroProducto }
            });
        } catch (error) {
            response.data = error;
            response.success = false;
            response.message = 'Error al buscar el producto, intente mas tarde.';
        }
        return response;
    }

}

module.exports = ReviewRepository;