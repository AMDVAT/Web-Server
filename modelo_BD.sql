
CREATE DATABASE AMDVAT;

USE AMDVAT;

CREATE TABLE categoria (
    id_categoria             INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre                   VARCHAR(30) NOT NULL,
    descripcion              VARCHAR(255),
    categoria_id_categoria   INTEGER
);

CREATE TABLE compra (
    id_compra            INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha                DATE,
    usuario_id_usuario   INTEGER NOT NULL
);

CREATE TABLE detalle_compra (
    id_detallecompra    INTEGER PRIMARY KEY AUTO_INCREMENT,
    cantidad            INTEGER NOT NULL,
    compra_id_compra    INTEGER NOT NULL,
    stock_id_sucursal   INTEGER NOT NULL,
    stock_id_producto   INTEGER NOT NULL
);

CREATE TABLE producto (
    id_producto              INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre                   VARCHAR(30) NOT NULL,
    descripcion              VARCHAR(50) NOT NULL,
    precio                   INTEGER NOT NULL,
    status                   INTEGER NOT NULL,
    precio_oferta            INTEGER,
    foto                     VARCHAR(255) NOT NULL,
    calificacion             INTEGER NOT NULL,
    categoria_id_categoria   INTEGER NOT NULL
);

CREATE TABLE reseña (
    id_reseña              INTEGER PRIMARY KEY AUTO_INCREMENT,
    comentario             VARCHAR(100),
    valoracion             INTEGER,
    usuario_id_usuario     INTEGER NOT NULL,
    producto_id_producto   INTEGER NOT NULL
);

CREATE TABLE stock (
    cantidad               INTEGER,
    sucursal_id_sucursal   INTEGER NOT NULL,
    producto_id_producto   INTEGER NOT NULL
);

ALTER TABLE stock ADD CONSTRAINT stock_pk PRIMARY KEY ( sucursal_id_sucursal,
                                                        producto_id_producto );

CREATE TABLE sucursal (
    id_sucursal   INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre        VARCHAR(30) NOT NULL,
    direccion     VARCHAR(60) NOT NULL,
    numero        INTEGER
);

CREATE TABLE tipo_usuario (
    id_tipousuario   INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre           VARCHAR(20) NOT NULL
);


CREATE TABLE usuario (
    id_usuario     INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre         VARCHAR(30) NOT NULL,
    apellido       VARCHAR(30) NOT NULL,
    email          VARCHAR(25) NOT NULL,
    password       VARCHAR(20) NOT NULL,
    tipo_usuario   INTEGER NOT NULL
);


ALTER TABLE categoria
    ADD CONSTRAINT categoria_categoria_fk FOREIGN KEY ( categoria_id_categoria )
        REFERENCES categoria ( id_categoria );

ALTER TABLE compra
    ADD CONSTRAINT compra_usuario_fk FOREIGN KEY ( usuario_id_usuario )
        REFERENCES usuario ( id_usuario );

ALTER TABLE detalle_compra
    ADD CONSTRAINT detalle_compra_compra_fk FOREIGN KEY ( compra_id_compra )
        REFERENCES compra ( id_compra );

ALTER TABLE detalle_compra
    ADD CONSTRAINT detalle_compra_stock_fk FOREIGN KEY ( stock_id_sucursal,
                                                         stock_id_producto )
        REFERENCES stock ( sucursal_id_sucursal,
                           producto_id_producto );

ALTER TABLE producto
    ADD CONSTRAINT producto_categoria_fk FOREIGN KEY ( categoria_id_categoria )
        REFERENCES categoria ( id_categoria );

ALTER TABLE reseña
    ADD CONSTRAINT reseña_producto_fk FOREIGN KEY ( producto_id_producto )
        REFERENCES producto ( id_producto );

ALTER TABLE reseña
    ADD CONSTRAINT reseña_usuario_fk FOREIGN KEY ( usuario_id_usuario )
        REFERENCES usuario ( id_usuario );

ALTER TABLE stock
    ADD CONSTRAINT stock_producto_fk FOREIGN KEY ( producto_id_producto )
        REFERENCES producto ( id_producto );

ALTER TABLE stock
    ADD CONSTRAINT stock_sucursal_fk FOREIGN KEY ( sucursal_id_sucursal )
        REFERENCES sucursal ( id_sucursal );

ALTER TABLE usuario
    ADD CONSTRAINT tipo_usuario_fk FOREIGN KEY ( tipo_usuario )
        REFERENCES tipo_usuario ( id_tipousuario );