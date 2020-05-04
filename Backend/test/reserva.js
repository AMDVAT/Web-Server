/*global describe:false, it:false, beforeEach:false, afterEach:false*/
require('dotenv').config();
let expect = require('chai').expect;

describe('TipoDeCambio Servicio', function () {

    const generarToken = require('../src/token/generarToken');
    const entradaCrearReserva = require('../src/mapeoObjetos/reserva/entrada/entradaCrearReserva');
    const entradaCrearDetalleReserva = require('../src/mapeoObjetos/reserva/entrada/entradaCrearDetalleReserva');

    // beforeEach(function (done) {
    //     done()
    // });

    // afterEach(function (done) {idUsuario
    //     mock.close(done);
    // });

    it('Entrada de reserva sin token', function (done) {
        expect(entradaCrearReserva({ headers: {} }))
            .to.be.a('null');
        done();
    });

    it('Entrada de reserva con token', function (done) {
        expect(entradaCrearReserva({ headers: { token: generarToken({ idUsuario: 1 }) } }))
            .to.be.a('object');
        done();
    });

    it('Entrada de reserva sin token', function (done) {
        expect(entradaCrearReserva({ headers: {} }))
            .to.be.a('null');
        done();
    });

});