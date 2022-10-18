
const express = require('express');
const { Router } = express;
const routerProductos = Router();
const Contenedor = require('../contenedor/Contenedor.js');

const ContenedorProds = new Contenedor();

routerProductos.get('/', (solicitud, respuesta) => {
    const productos = ContenedorProds.obtenerTodos();
    respuesta.send({success: true, data: productos});
});

routerProductos.get('/:id', (solicitud, respuesta) => {
    const {id} = solicitud.params;
    const producto = ContenedorProds.obtenerXid (Number(id));

    if(!producto){
        return respuesta.send({success: false, data: undefined, message: "Producto no encontrado"});
    }

    respuesta.send({success: true, data: producto});
});

routerProductos.post('/', (solicitud, respuesta) => {
    const {title, price, thumbnail} = solicitud.body;
    const nuevoProducto = ContenedorProds.guardar ({ title, price, thumbnail });
    respuesta.send({success: true, data: {id: nuevoProducto.id } });
});

routerProductos.put('/:id', (solicitud, respuesta) => {
    const {id} = solicitud.params;
    const {title, price, thumbnail} = solicitud.body;
    const prodActualizado = ContenedorProds.actualizar(id, { title, price, thumbnail });
    respuesta.send({success: true, data: {updated: prodActualizado}});
});

routerProductos.delete('/:id', (solicitud, respuesta) => {
    const prods = Contenedor.productos.filter(prod => prod.id != solicitud.params.id)
    respuesta.send({ prods });
})

module.exports = routerProductos;


