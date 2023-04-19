const fs = require('fs');


class CartManager {
    constructor () {
        this.carts = [];
        this.latestId = 1;
        this.path = '../src/carrito.JSON';
    } 

    async load() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
            console.log('Carts data loaded successfully');
        } catch (error) {
            console.log(error);
            throw new Error('Error loading carts data');
        }
    };

    async addCart (cartData) {
        const newCart = {
            id: parseInt(Math.random() * 100), //tuve que hacerlo así porque el método que yo usaba antes dejó de funcionar
            products: []
        };
        
        this.carts.push (newCart);
        console.log("cart agregado con éxito");
    
        fs.readFile(this.path, 'utf-8', (err, cartData) => {
            if (err) {
                console.log(err);
                return;
            }
            let cart = [];

            if (cartData) {
                try {
                    cart = JSON.parse(cartData);
                } catch {
                    console.log('Error parsing JSON string:');
                    return;
                }
            }

            cart.push(newCart);

            fs.writeFile(this.path, JSON.stringify(cart), (err) => {
                if (err) throw err;
                console.log('Archivo guardado con éxito');
            });
        });
    };     
    

    async getCartById(cartId) {
        const data = await fs.promises.readFile(this.path, 'utf-8'); 
        const cartsData = JSON.parse(data);

        const cart = cartsData.find(cartData => cartData.id === cartId);
        if (cart) {
            //console.log(cart);
            return cart.products; 
        } else {
            console.log("Error: cart no encontrado - cartmanager.js");
        }
    } 


    async addProductToCart (cartId, cartProductId, cartProductQuantity) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const cartsData = JSON.parse(data);
        
        const cartIndex = cartsData.findIndex(cart => cart.id === cartId);
        if (cartIndex === -1) {
            console.log('Error: cart no encontrado');
            return;
        }


















        const existingProductIndex = cartsData[cartIndex].products.findIndex(product => product.productId === cartProductId);
  if (existingProductIndex !== -1) {
    // Product already exists in the cart, update quantity
    cartsData[cartIndex].products[existingProductIndex].quantity += cartProductQuantity;
  } else {
    // Product doesn't exist in the cart, add it
    const cartProduct = {
      productId: cartProductId,
      quantity: cartProductQuantity
    }
    cartsData[cartIndex].products.push(cartProduct);
  }
        await fs.promises.writeFile(this.path, JSON.stringify(cartsData));
        console.log("Producto del carrito actualizado");
    }




    /* async addProductToCart (cartId, cartProductId, cartProductQuantity) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const cartsData = JSON.parse(data);
        
        const cartProduct = {
            productId: cartProductId,
            quantity: cartProductQuantity
        }

        const cartIndex = cartsData.findIndex(cart => cart.id === cartId);
        if (cartIndex === -1) {
            console.log('Error: cart no encontrado');
            return;
        } else {
            cartsData[cartIndex].products.push(cartProduct);
        }

        await fs.promises.writeFile(this.path, JSON.stringify(cartsData));
    console.log("Producto actualizado con éxito");
    }
 */





    /* async updateProductInCart (productId, field, updateData) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        
        const index = products.findIndex(product => product.id === productId);
        if (index === -1) {
            console.log('Error: producto no encontrado');
            return;
        }
        products[index][field] = updateData[field];

        fs.writeFile(this.path, JSON.stringify(products), err => {
            if (err) throw err;
            console.log('Producto actualizado con éxito desde updateProduct')
        });
    } */

    /* async updateProductInCart2 (cartId, cartProductId, cartProductQuantity) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const cartsData = JSON.parse(data);
        const cartProduct = {
            productId: parseInt(Math.random() * 100),
            quantity: cartProductQuantity
        }

        const cartIndex = cartsData.findIndex(cart => cart.id === cartId);
        if (cartIndex === -1) {
            console.log('Error: cart no encontrado');
            return;
        }
        
        const changeCartProduct = cartsData[cartIndex];
        const productIndex = changeCartProduct.products.findIndex(product => product.productId === cartProductId);
        if (productIndex === -1) {
            console.log('Error: producto no encontrado en tu carrito');
            return;
        }
        
        cart.products[productIndex].quantity = cartProductQuantity;

        await fs.promises.writeFile(this.path, JSON.stringify(cartsData));
    console.log("Producto actualizado con éxito");
    } */

    /* async getCarts() {

        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const cartGet = JSON.parse(data);
            console.log(cartGet);
            return this.cartGet;
        } catch (error) {
            console.log(error);
            return;
        }
    } */
    
    /* async addcart (cartData) {
        /* const newCart = {
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    thumbnail: data.thumbnail,
                    code: data.code,
                    stock: data.stock,
                    status: data.status, 
                    category: data.category,
                    id: parseInt(Math.random() * 10) //tuve que hacerlo así porque el método que yo usaba antes dejó de funcionar
                } 
        if (!cartData.title || !cartData.description || !cartData.price || !cartData.thumbnail || !cartData.code || !cartData.stock || !cartData.status || !cartData.category) {
            console.log("Error: todos los campos son obligatorios");
            return; 
        }  else {
            const found = this.products.some(product => data.code === code);
            if (found) {
                console.log(`Error: Ya existe un producto con el código ${code}`);
                return;
            } else {
                const newCart = {
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    thumbnail: data.thumbnail,
                    code: data.code,
                    stock: data.stock,
                    status: data.status, 
                    category: data.category,
                    id: parseInt(Math.random() * 10) //tuve que hacerlo así porque el método que yo usaba antes dejó de funcionar
                }
            
                
            
                this.products.push (newproduct);
                console.log("Producto agregado con éxito");

            fs.readFile(this.path, 'utf8', (err, prodData) => {
                if (err) {
                    console.error(err);
                    return;
                }

                let products = [];

                if (prodData) {
                    try {
                        products = JSON.parse(prodData);
                    } catch {
                        console.error('Error parsing JSON string:');
                        return;
                    }
                }

                products.push(newproduct);

                fs.writeFile(this.path, JSON.stringify(products), (err) => {
                    if (err) throw err;
                    console.log('Archivo guardado con éxito');
                });
            });

                }
            }
        }
 */
    /* async getProducts() {

        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            console.log(products);
            return this.products;
        } catch (error) {
            console.log(error);
            return;
        }
    } */

    /* async getProductById(productId) {
        const data = await fs.promises.readFile(this.path, 'utf-8'); 
        const productsById = JSON.parse(data);
        const product = productsById.find(product => product.id === productId);
        if (product) {
            console.log(product);
            return product; 
        } else {
            console.log("Error: producto no encontrado");
        }
    }  */

    /* async updateProduct (productId, field, updateData) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        
        const index = products.findIndex(product => product.id === productId);
        if (index === -1) {
            console.log('Error: producto no encontrado');
            return;
        }
        products[index][field] = updateData[field];

        fs.writeFile(this.path, JSON.stringify(products), err => {
            if (err) throw err;
            console.log('Producto actualizado con éxito desde updateProduct')
        });
    }
 */
    /* async deleteProduct (deleteById){
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);

        const deleteItemFilter = products.filter(product => product.id !== deleteById);

        if (deleteItemFilter.length === products.length) {
            console.log(`Error: No se encontró producto con ID ${deleteById}`);
            return;
        }

        fs.writeFile(this.path, JSON.stringify(deleteItemFilter), err => {
            if (err) throw err;
            console.log('Producto borrado con éxito desde deleteProduct');
        });
        
    }  */

}

module.exports = CartManager;

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






