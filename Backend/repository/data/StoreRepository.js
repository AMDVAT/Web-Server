class StoreRepository {
    constructor(opts) {
        this.StoreDataRepository = opts.StoreDataRepository;
    }

    async listarSucursales() {
        const response = {
            data: null,
            message: null,
            success: true
        };
        const params = {
            order: [['nombre', 'ASC']]
        };
        try {
            // Listado de categorias ordenados alfabeticamente
            response.data = await this.StoreDataRepository.findAll(params);
        } catch (error) {
            response.success = false;
            response.message = 'Error al obtener sucursales, intente mas tarde.';
        }
        return response;
    }

    async crearSucursal(body) {
        const sucursal = {
            nombre: body.nombre,
            direccion: body.direccion,
            numero: body.numero,
        };
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.StoreDataRepository.create(sucursal);
            response.message = 'Sucursal creada correctamente.';
        } catch (error) {
            response.success = false;
            response.message = 'Error al crear una sucursal, intente mas tarde.';
        }
        return response;
    }

    async editarSucursal(body, params) {
        const idSucursal = params.id;
        const sucursal = {
            nombre: body.nombre,
            direccion: body.direccion,
            numero: body.numero,
        };
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            response.data = await this.StoreDataRepository.update(sucursal, { where: { idSucursal } });
            response.message = 'Sucursal actualizada correctamente.';
        } catch (error) {
            response.success = false;
            response.message = 'Error al actualizar la sucursal, intente mas tarde.';
        }
        return response;
    }

    async buscarSucursal(params) {
        const idSucursal = params.id;
        const response = {
            data: null,
            message: null,
            success: true
        };
        try {
            // Listado de categorias ordenados alfabeticamente
            response.data = await this.StoreDataRepository.findOne({
                // order: [['nombre', 'ASC']],
                where: { idSucursal }
            });
            if(!response.data) response.message = 'No se ha podido encontrar el elemento solicitado.';
        } catch (error) {
            response.success = false;
            response.message = 'Error al obtener categorias, intente mas tarde.';
        }
        return response;
    }
}

module.exports = StoreRepository;