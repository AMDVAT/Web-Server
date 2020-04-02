const awilix = require('awilix');
// Repositorio
const UserRepository = require('../data/UserRepository');
const ProductRepository = require('../data/ProductRepository');
const CategoryRepository = require('../data/CategoryRepository');
const StoreRepository = require('../data/StoreRepository');
const ReservationRepository = require('../data/ReservationRepository');
const DetailReservationRepository = require('../data/DetailReservationRepository');

const container = awilix.createContainer();

// Registro de clases
container.register({
    UserRepository: awilix.asClass(UserRepository),
    ProductRepository: awilix.asClass(ProductRepository),
    CategoryRepository: awilix.asClass(CategoryRepository),
    StoreRepository: awilix.asClass(StoreRepository),
    ReservationRepository: awilix.asClass(ReservationRepository),
    DetailReservationRepository: awilix.asClass(DetailReservationRepository)
});

module.exports = container;