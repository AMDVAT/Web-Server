let expect = require('chai').expect;

describe('Crear Resena.', function () {

    const entradaResena = require('../src/mapeoObjetos/resena/entrada/entradaCrearResena');
    let resena, resenaIncorrecta,resenaSinComentario;

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
        };
        resenaSinComentario = {
            "valoracion": "5",
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

    it('Resena sin valoracion no aceptada', function (done){
        const review = entradaResena(resenaIncorrecta);
        expect(review.valoracion)
            .to.be.a('undefined');
        done();
    });

    it('Resena sin comentario no aceptada', function (done){
        const review = entradaResena(resenaSinComentario);
        expect(review.comentario)
            .to.be.a('undefined');
        done();
    });

});