let expect = require('chai').expect;

describe('Crear Resena.', function () {

    const entradaResena = require('../src/mapeoObjetos/resena/entrada/entradaCrearResena');
    let resena;

    beforeEach(function (done) {
        resena = {
            "comentario": "Muy buen producto",
            "valoracion": "5",
            "usuario": "1",
            "producto": "1"
        };
        resenaIncorrecta = {
            "comentario": "Muy buen producto",
            "usuario": "1",
            "producto": "1"
        }
        done()
    });

    it('Mapeo correcto de registro de resena', function (done) {
        expect(entradaResena(resena))
            .to.be.a('object');
        done();
    });

});