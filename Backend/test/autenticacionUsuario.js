let expect = require('chai').expect;

describe('Autenticacion de usuario', function () {

    const entradaAutenticar = require('../src/mapeoObjetos/usuario/entrada/entradaInicioSesionUsuario');
    let user,emailUserNull,passwordUserNull;

    beforeEach(function (done) {
        user = {
            "email": "osuna",
            "contrasena": "osuna123"
        };
        emailUserNull = {
            "contrasena": "osuna123"
        };
        passwordUserNull = {
            "email": "osuna"
        };
        done()
    });

    it('Mapeo correcto de autenticacion de usuario', function (done) {
        expect(entradaAutenticar(user))
            .to.be.a('object');
        done();
    });

    it('Mapeo de email null', function (done) {
        const { data } = entradaAutenticar(emailUserNull);
        const email = data.email;
        expect(email)
            .to.be.a('null')
        done();
    });
    
    it('Mapeo de contraseña null', function (done) {
        const { data } = entradaAutenticar(passwordUserNull);
        const pass = data.password;
        expect(pass)
            .to.be.a('null')
        done();
    });

});