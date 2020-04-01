
CREATE DATABASE AMDVAT;

USE AMDVAT;

CREATE TABLE categoria (
    id_categoria             INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre                   VARCHAR(150) NOT NULL,
    descripcion              VARCHAR(500),
    categoria_id_categoria   INTEGER
);

CREATE TABLE compra (
    id_compra            INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha                DATE,
    id_usuario          INTEGER NOT NULL
);

CREATE TABLE detalle_compra (
    id_detallecompra    INTEGER PRIMARY KEY AUTO_INCREMENT,
    cantidad            INTEGER NOT NULL,
    id_compra           INTEGER NOT NULL,
    id_sucursal         INTEGER NOT NULL,
    id_producto         INTEGER NOT NULL
);

CREATE TABLE producto (
    id_producto              INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre                   VARCHAR(200) NOT NULL,
    descripcion              VARCHAR(500) NOT NULL,
    precio                   INTEGER NOT NULL,
    estado                   INTEGER NOT NULL,
    precio_oferta            INTEGER,
    foto                     VARCHAR(500) NOT NULL,
    calificacion             INTEGER NOT NULL,
    id_categoria             INTEGER NOT NULL
);

CREATE TABLE resena (
    id_resena              INTEGER PRIMARY KEY AUTO_INCREMENT,
    comentario             VARCHAR(500),
    valoracion             INTEGER,
    id_usuario             INTEGER NOT NULL,
    id_producto            INTEGER NOT NULL
);

CREATE TABLE stock (
    cantidad               INTEGER,
    id_sucursal   INTEGER NOT NULL,
    id_producto   INTEGER NOT NULL
);

ALTER TABLE stock ADD CONSTRAINT stock_pk PRIMARY KEY ( id_sucursal,id_producto );

CREATE TABLE sucursal (
    id_sucursal   INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre        VARCHAR(150) NOT NULL,
    direccion     VARCHAR(400) NOT NULL,
    numero        INTEGER
);

CREATE TABLE tipo_usuario (
    id_tipousuario   INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre           VARCHAR(20) NOT NULL
);


CREATE TABLE usuario (
    id_usuario     INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre         VARCHAR(50) NOT NULL,
    apellido       VARCHAR(50) NOT NULL,
    email          VARCHAR(50) NOT NULL,
    password       VARCHAR(30) NOT NULL,
    estado         INTEGER NOT NULL,
    tipo_usuario   INTEGER NOT NULL
);

CREATE TABLE busqueda(
    id_busqueda         INTEGER PRIMARY KEY AUTO_INCREMENT,
    fecha               DATE NOT NULL,
    id_usuario          INTEGER NOT NULL,
    id_producto         INTEGER NOT NULL
);

CREATE TABLE proveedor(
    id_proveedor        INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre              VARCHAR(150) NOT NULL,
    email               VARCHAR(50) NOT NULL,
    telefono            VARCHAR(15) NOT NULL,
    direccion           VARCHAR(50) NOT NULL
);

CREATE TABLE entrada_producto(
    id_entrada          INTEGER PRIMARY KEY AUTO_INCREMENT,
    fecha               DATE NOT NULL,
    cantidad            INTEGER NOT NULL,
    precio_unitario     INTEGER NOT NULL,
    id_producto         INTEGER NOT NULL,
    id_proveedor        INTEGER NOT NULL
);

CREATE TABLE estado_usuario(
    id_estado           INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre              VARCHAR(50) NOT NULL
);

CREATE TABLE estado_producto(
    id_estado           INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre              VARCHAR(50) NOT NULL
);        

CREATE TABLE estado_reserva(
    id_estado           INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre              VARCHAR(50) NOT NULL
);

CREATE TABLE reserva (
    id_reserva           INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha                DATE NOT NULL,
    estado               INTEGER NOT NULL,
    id_usuario           INTEGER NOT NULL
);

CREATE TABLE detalle_reserva (
    id_detalleReserva   INTEGER PRIMARY KEY AUTO_INCREMENT,
    cantidad            INTEGER NOT NULL,
    id_reserva          INTEGER NOT NULL,
    id_sucursal         INTEGER NOT NULL,
    id_producto         INTEGER NOT NULL
);

CREATE TABLE funcion(
id_fucion 		INTEGER PRIMARY KEY auto_increment,
nombre 			VARCHAR(100) NOT NULL,
descripcion 	VARCHAR(250)
);


CREATE TABLE funcion_tipoUsuario(
id_funcion 		INTEGER NOT NULL,
id_tipousuario 	INTEGER NOT NULL,
permiso			INTEGER NOT NULL
);

ALTER TABLE funcion_tipoUsuario ADD CONSTRAINT funciontipo_pk PRIMARY KEY ( id_funcion, id_tipoUsuario );


ALTER TABLE categoria
    ADD CONSTRAINT categoria_categoria_fk FOREIGN KEY ( categoria_id_categoria )
        REFERENCES categoria ( id_categoria );

ALTER TABLE reserva
    ADD CONSTRAINT reserva_usuario_fk FOREIGN KEY ( id_usuario )
        REFERENCES usuario ( id_usuario );

ALTER TABLE reserva
    ADD CONSTRAINT reserva_estado_fk FOREIGN KEY ( estado )
        REFERENCES estado_reserva ( id_estado );

ALTER TABLE detalle_reserva
    ADD CONSTRAINT detalle_reserva_fk FOREIGN KEY ( id_reserva )
        REFERENCES reserva ( id_reserva );

ALTER TABLE detalle_reserva
    ADD CONSTRAINT stock_detalle_fk FOREIGN KEY ( id_sucursal, id_producto )
        REFERENCES stock ( id_sucursal,id_producto );

ALTER TABLE compra
    ADD CONSTRAINT compra_usuario_fk FOREIGN KEY ( id_usuario )
        REFERENCES usuario ( id_usuario );

ALTER TABLE detalle_compra
    ADD CONSTRAINT detalle_compra_compra_fk FOREIGN KEY ( id_compra )
        REFERENCES compra ( id_compra );

ALTER TABLE detalle_compra
    ADD CONSTRAINT detalle_compra_stock_fk FOREIGN KEY ( id_sucursal, id_producto )
        REFERENCES stock ( id_sucursal, id_producto );

ALTER TABLE producto
    ADD CONSTRAINT producto_categoria_fk FOREIGN KEY ( id_categoria )
        REFERENCES categoria ( id_categoria );

ALTER TABLE producto
    ADD CONSTRAINT producto_estado_fk FOREIGN KEY ( estado )
        REFERENCES estado_producto ( id_estado );

ALTER TABLE resena
    ADD CONSTRAINT resena_producto_fk FOREIGN KEY ( id_producto )
        REFERENCES producto ( id_producto );

ALTER TABLE resena
    ADD CONSTRAINT resena_usuario_fk FOREIGN KEY ( id_usuario )
        REFERENCES usuario ( id_usuario );

ALTER TABLE stock
    ADD CONSTRAINT stock_producto_fk FOREIGN KEY ( id_producto )
        REFERENCES producto ( id_producto );

ALTER TABLE stock
    ADD CONSTRAINT stock_sucursal_fk FOREIGN KEY ( id_sucursal )
        REFERENCES sucursal ( id_sucursal );

ALTER TABLE usuario
    ADD CONSTRAINT tipo_usuario_fk FOREIGN KEY ( tipo_usuario )
        REFERENCES tipo_usuario ( id_tipousuario );

ALTER TABLE usuario
    ADD CONSTRAINT estado_usuario_fk FOREIGN KEY ( estado )
        REFERENCES estado_usuario ( id_estado );

ALTER TABLE busqueda
    ADD CONSTRAINT busqueda_usuario_fk FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario);

ALTER TABLE busqueda
    ADD CONSTRAINT busqueda_producto_fk FOREIGN KEY (id_producto)
        REFERENCES producto(id_producto);

ALTER TABLE entrada_producto
    ADD CONSTRAINT entrada_producto_fk FOREIGN KEY (id_producto)
        REFERENCES producto(id_producto);
    
ALTER TABLE entrada_producto
    ADD CONSTRAINT entrada_proveedor_fk FOREIGN KEY (id_proveedor)
        REFERENCES proveedor(id_proveedor);


ALTER TABLE funcion_tipoUsuario
    ADD CONSTRAINT funcion_FuncionTipo_fk FOREIGN KEY ( id_funcion )
        REFERENCES funcion ( id_fucion );
        
ALTER TABLE funcion_tipoUsuario
    ADD CONSTRAINT tipo_FuncionTipo_fk FOREIGN KEY ( id_tipousuario )
        REFERENCES tipo_usuario ( id_tipousuario );
