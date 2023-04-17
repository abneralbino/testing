const fs = require('fs').promises;
const express = require('express');
const ProductManager = require ('../ProductManager.js');
const app = require ('../app');

let bodyParser = require('body-parser')

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

let productos = [];

/* const loadData = async () => {
  const rawdata = await fs.readFile('./listad');
  productos = JSON.parse(rawdata);
};

const productMa = require ('../listadoDeproductos.JSON');

loadData();  */

router.get('/products', async (req, res) => {
  const limite = req.query.limite;
  

  try {
    await ProductManager.load();
    let products = await ProductManager.getProducts();

    if (limite) {
      products = products.slice(0, parseInt(limite));
    } 

    res.json(products);
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

/* router.get('/products/:pid', async (req, res) => {
  
  const productId = req.params.pid;

  try {
    //await productManager.load();
    const product = await productManager.getProductById(parseInt(productId));

    if (!product) {
      res.status(404).send(`No se encontró ID ${productId}`);
    } else {
      return res.status(200).send(product);
    }
  } catch (error) {
    res.status(500).send({error: error.message});
  }
}); */


module.exports = router;