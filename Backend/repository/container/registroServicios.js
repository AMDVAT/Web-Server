const awilix = require('awilix');
// Repositorio
const UserRepository = require('../data/UserRepository');

const container = awilix.createContainer();

// Registro de clases
container.register({
    UserRepository: awilix.asClass(UserRepository)
});

module.exports = container;