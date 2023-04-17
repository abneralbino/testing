const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const ProductManager = require('./ProductManager.js');

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
