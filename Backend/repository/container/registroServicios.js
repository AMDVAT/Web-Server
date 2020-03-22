const awilix = require('awilix');
// Repositorio
const UserRepository = require('../data/UserRepository');
const ProductRepository = require('../data/ProductRepository');

const container = awilix.createContainer();

// Registro de clases
container.register({
    UserRepository: awilix.asClass(UserRepository),
    ProductRepository: awilix.asClass(ProductRepository)
});

module.exports = container;