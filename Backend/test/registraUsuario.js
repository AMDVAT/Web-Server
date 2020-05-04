let expect = require('chai').expect;

describe('Registro de usuario.', function () {

    const entradaRegistrar = require('../src/mapeoObjetos/usuario/entrada/entradaCrearUsuario');
    let user, userIncorrect;

    beforeEach(function (done) {
        user = {
            "nombre": "test",
            "apellido": "test",
            "email": "test@gmail.com",
            "password": "test123",
            "tipo_usuario": "1"
        };
        userIncorrect = {
            "apellido": "test",
            "email": "test@gmail.com",
            "password": "test123",
            "tipo_usuario": "1"
        };
        done()
    });

    it('Mapeo correcto de registro de usuario', function (done) {
        expect(entradaRegistrar(user))
            .to.be.a('object');
        done();
    });

    it('Mapeo incorrecto de registro de usuario', function (done){
        const nombre = entradaRegistrar(userIncorrect);
        expect(nombre.nombre)
            .to.be.a('undefined');
        done();
    });

});