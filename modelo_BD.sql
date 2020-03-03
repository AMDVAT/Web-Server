CREATE DATABASE AMDVAT;

USE AMDVAT;

CREATE TABLE categoria (
    id_categoria             INTEGER NOT NULL,
    nombre                   VARCHAR2(30),
    categoria_id_categoria   INTEGER
);

ALTER TABLE categoria ADD CONSTRAINT categoria_pk PRIMARY KEY ( id_categoria );

CREATE TABLE compra (
    id_compra            INTEGER NOT NULL,
    fecha                DATE,
    usuario_id_usuario   INTEGER NOT NULL
);

ALTER TABLE compra ADD CONSTRAINT compra_pk PRIMARY KEY ( id_compra );

CREATE TABLE detalle_compra (
    id_detallecompra    INTEGER NOT NULL,
    compra_id_compra    INTEGER NOT NULL,
    stock_id_sucursal   INTEGER NOT NULL,
    stock_id_producto   INTEGER NOT NULL
);

ALTER TABLE detalle_compra ADD CONSTRAINT detalle_compra_pk PRIMARY KEY ( id_detallecompra );

CREATE TABLE producto (
    id_producto              INTEGER NOT NULL,
    nombre                   VARCHAR2(30),
    descripcion              VARCHAR2(50),
    precio                   NUMBER,
    ofertado                 NUMBER,
    precio_oferta            NUMBER,
    categoria_id_categoria   INTEGER NOT NULL
);

ALTER TABLE producto ADD CONSTRAINT producto_pk PRIMARY KEY ( id_producto );

CREATE TABLE reseña (
    id_reseña              INTEGER NOT NULL,
    comentario             VARCHAR2(100),
    valoracion             INTEGER,
    usuario_id_usuario     INTEGER NOT NULL,
    producto_id_producto   INTEGER NOT NULL
);

ALTER TABLE reseña ADD CONSTRAINT reseña_pk PRIMARY KEY ( id_reseña );

CREATE TABLE stock (
    cantidad               INTEGER,
    sucursal_id_sucursal   INTEGER NOT NULL,
    producto_id_producto   INTEGER NOT NULL
);

ALTER TABLE stock ADD CONSTRAINT stock_pk PRIMARY KEY ( sucursal_id_sucursal,
                                                        producto_id_producto );

CREATE TABLE sucursal (
    id_sucursal   INTEGER NOT NULL,
    nombre        VARCHAR2(30),
    direccion     VARCHAR2(60),
    numero        INTEGER
);

ALTER TABLE sucursal ADD CONSTRAINT sucursal_pk PRIMARY KEY ( id_sucursal );

CREATE TABLE tipo_usuario (
    id_tipousuario   INTEGER NOT NULL,
    nombre           VARCHAR2(20)
);

ALTER TABLE tipo_usuario ADD CONSTRAINT tipo_usuario_pk PRIMARY KEY ( id_tipousuario );

CREATE TABLE usuario (
    id_usuario     INTEGER NOT NULL,
    nombre         VARCHAR2(30),
    apellido       VARCHAR2(30),
    email          VARCHAR2(25),
    password       VARCHAR2(20),
    direccion      VARCHAR2(30),
    telefono       INTEGER,
    tipo_usuario   INTEGER NOT NULL
);

ALTER TABLE usuario ADD CONSTRAINT usuario_pk PRIMARY KEY ( id_usuario );

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
