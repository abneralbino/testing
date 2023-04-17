const fs = require('fs').promises;
const express = require('express');
const ProductManager = require('../ProductManager');

let bodyParser = require('body-parser')

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

let productos = [];

const loadData = async () => {
  const rawdata = await fs.readFile('./listadoDeProductos.JSON');
  productos = JSON.parse(rawdata);
};

loadData();

router.get('/products', async (req, res) => {
  const limite = req.query.limite;
  const productManager = new ProductManager();

  try {
    await productManager.load();
    let products = await productManager.getProducts();

    if (limite) {
      products = products.slice(0, parseInt(limite));
    }

    res.json(products);
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

router.get('/products/:pid', async (req, res) => {
  const productManager = new ProductManager();
  const productId = req.params.pid;

  try {
    await productManager.load();
    const product = await productManager.getProductById(parseInt(productId));

    if (!product) {
      res.status(404).send(`No se encontró ID ${productId}`);
    } else {
      return res.status(200).send(product);
    }
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

router.post('/products', async (req, res) => {
    const productManager = new ProductManager();

    try {
        await productManager.load();
        const newProduct = await productManager.addProduct(req.body);
        console.log(req.body);

        productos.push(newProduct);
        console.log(typeof fs); 
        await fs.writeFile('./listadoDeProductos.JSON', JSON.stringify(productos, null, 2));

        res.status(201).send(newProduct);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});

module.exports = router;