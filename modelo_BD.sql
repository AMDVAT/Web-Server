CREATE DATABASE AMDVAT;

CREATE TABLE tipo_usuario (
    id_tipoUsuario   INTEGER PRIMARY KEY,
    nombre           VARCHAR(20)
)

CREATE TABLE usuario (
    id_usuario     INTEGER PRIMARY KEY,
    nombre         VARCHAR(30),
    apellido       VARCHAR(30),
    email          VARCHAR(25),
    password       VARCHAR(20),
    direccion      VARCHAR(30),
    telefono       INTEGER,
    tipo_usuario   INTEGER NOT NULL,
    foreign key (tipo_usuario) REFERENCES tipo_usuario(id_tipoUsuario)
)