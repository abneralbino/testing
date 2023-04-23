//const fs = require('fs');
//const express = require('express');
//const bodyParser = require('body-parser');
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';




/////////////////////////
import handlebars from 'express-handlebars';
import Engine from 'express-handlebars';
import { __dirname } from './utils.js'
/////////////////////////

//const ProductManager = require('./ProductManager');
//const CartManager = require('./CartManager');

import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';
///////////////////////////////////////////////

//const routerProducts = require('./routes/products.routes');
//const routerCarts = require('./routes/carts.routes');

import router from './routes/products.routes.js';
//import CartRouter from './routes/carts.routes.js';
import cartRouter from './routes/carts.routes.js';

////////////////////////////////////////////////////

const PUERTO = 1000;

const app = express();

app.engine ('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('public'));

/* app.use('/api', router);
app.use('/api', cartRouter);
app.use(express.static('/public', express.static(`${__dirname}/public`)));*/

app.get ('/', (req, res) => {
    res.render('index', { getProducts });
});

app.listen(PUERTO, () => {
    console.log(`Servidor inicializado en puerto ${PUERTO}`);
});

export default app;
//
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