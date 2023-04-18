const express = require('express');
const router = express.Router();
const ProductManager = require ('../ProductManager.js');
let bodyParser = require('body-parser')

const productos = new ProductManager();


router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

let products = [];


router.get('/products', async (req, res) => {
  const limite = req.query.limite;
  try {
    await productos.load();
    let product = await productos.getProducts();

    if (limite) {
      products = products.slice(0, parseInt(limite));
    } 
    
  res.status(200).send(product);

  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

router.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const product = await productos.getProductById(parseInt(productId));

    if (!product) {
      res.status(404).send(`No se encontró ID ${productId}`);
    } else {
      return res.status(200).send(product);
    }
  } catch (error) {
    res.status(500).send({error: error.message});
  }
}); 

router.post ('/products', async (req, res) =>{
  const newProduct = req.body;

  const transport = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    code: req.body.code,
    stock: req.body.stock,
    status: req.body.status,
    category: req.body.category,
  
  }
  
  res.send(await productos.addProduct(transport));
  
});

router.put('/products/:pid/:field', async (req, res) => {

const productId = parseInt(req.params.pid);
const field = req.params.field;
const updateData = req.body;

res.send(await productos.updateProduct(productId, field, updateData));
console.log(productId);
console.log(field);
console.log(updateData);

}); 

router.delete ('/products/:pid', async (req, res) => {
  const deleteById = parseInt(req.params.pid);

  res.send(await productos.deleteProduct(deleteById));
  console.log(deleteById);
});

module.exports = router;

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