const awilix = require('awilix');
// Repositorio
const UserRepository = require('../data/UserRepository');
const ProductRepository = require('../data/ProductRepository');
const CategoryRepository = require('../data/CategoryRepository');
const StoreRepository = require('../data/StoreRepository');
const ReservationRepository = require('../data/ReservationRepository');
const DetailReservationRepository = require('../data/DetailReservationRepository');
const SuscriptionRepository = require('../data/SuscriptionRepository');
const SearchRepository = require('../data/SearchRepository');
const ReviewRepository = require('../data/ReviewRepository');

const container = awilix.createContainer();

// Registro de clases
container.register({
    UserRepository: awilix.asClass(UserRepository),
    ProductRepository: awilix.asClass(ProductRepository),
    CategoryRepository: awilix.asClass(CategoryRepository),
    StoreRepository: awilix.asClass(StoreRepository),
    ReservationRepository: awilix.asClass(ReservationRepository),
    DetailReservationRepository: awilix.asClass(DetailReservationRepository),
    SuscriptionRepository: awilix.asClass(SuscriptionRepository),
    SearchRepository: awilix.asClass(SearchRepository),
    ReviewRepository: awilix.asClass(ReviewRepository)
});

module.exports = container;