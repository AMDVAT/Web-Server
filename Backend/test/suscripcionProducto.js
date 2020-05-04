let expect = require('chai').expect;

describe('Suscripcion a un producto.', function () {

    const entradaSuscripcion = require('../src/mapeoObjetos/suscripcion/entrada/entradaCrearSuscripcion');
    let suscription;

    beforeEach(function (done) {
        suscription = {
            "tokenData": {
                "isUsuario": "1"
            },
            "body": {
                "id_producto": "2"
            }
        };

        done()
    });


    it('Mapeo correcto de suscripcion de producto.', function (done) {
        const data = entradaSuscripcion(suscription);
        expect(data)
            .to.be.a('object');
        done();
    });

    it('Verificar que siempre tenga un estado 1 al ser suscrito.', function (done) {
        const { data } = entradaSuscripcion(suscription);
        expect(data.id_estado)
            .to.be.a('number')
            .to.be.equal(1);
        done();
    })

    it('Verificar la fecha del momento que se registro la suscripcion', function (done) {
        const { data } = entradaSuscripcion(suscription);
        const now = new Date();
      
        expect(data.fecha.getDate())
            .to.be.a('number')
            .to.be.equal(now.getDate());

        expect(data.fecha.getMonth())
            .to.be.a('number')
            .to.be.equal(now.getMonth());
            
        expect(data.fecha.getYear())
            .to.be.a('number')
            .to.be.equal(now.getYear());
        done();
    })

});