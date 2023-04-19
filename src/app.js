const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager');

const routerProducts = require('./routes/products.routes');
const routerCarts = require('./routes/carts.routes');

const PUERTO = 1000;

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api', routerProducts);
app.use('/api', routerCarts);

app.listen(PUERTO, () => {
    console.log(`Servidor inicializado en puerto ${PUERTO}`);
});

module.exports = app;

/*PARA PROBAR

{
    "title": "pants",
    "description": "panties",
    "price": 50000,
    "thumbnail": "paaants",
    "code": "pant123",
    "stock": 2,
    "status": true,
    "category": "pants"
}*/

/*,{
    "title": "shirt",
    "description": "shirt",
    "price": 500,
    "thumbnail": "cool shirt",
    "code": "shir123",
    "stock": 10,
    "status": true,
    "category": "shirts"
},{
    "title": "socks",
    "description": "socks that sucks",
    "price": 50,
    "thumbnail": "soooocks",
    "code": "SO123",
    "stock": 30,
    "status": true,
    "category": "underwear"
}*/