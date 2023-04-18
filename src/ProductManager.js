const fs = require('fs');
/* const express = require('express');
const PUERTO = 1000;
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json()); */

class ProductManager {
    constructor () {
        this.products = [];
        this.latestId = 1;
        this.path = '../src/listadoDeProductos.JSON';
    } 

    async load() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            console.log('Data loaded successfully');
        } catch (error) {
            console.log(error);
            throw new Error('Error loading data');
        }
    }

    async addProduct (data) {
        
        if (!data.title || !data.description || !data.price || !data.thumbnail || !data.code || !data.stock || !data.status || !data.category) {
            console.log("Error: todos los campos son obligatorios");
            return; 
        }  else {
            const found = this.products.some(product => data.code === code);
            if (found) {
                console.log(`Error: Ya existe un producto con el código ${code}`);
                return;
            } else {
                const newproduct = {
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

    async getProducts() {

        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            console.log(products);
            return this.products;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async getProductById(productId) {
        const data = await fs.promises.readFile(this.path, 'utf-8'); 
        const productsById = JSON.parse(data);
        const product = productsById.find(product => product.id === productId);
        if (product) {
            console.log(product);
            return product; 
        } else {
            console.log("Error: producto no encontrado");
        }
    } 

    async updateProduct (productId, field, updateData) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        
        const index = products.findIndex(product => product.id === productId);
        if (index === -1) {
            console.log('Error: producto no encontrado');
            return;
        }
        products[index][field] = updateData;

        fs.writeFile(this.path, JSON.stringify(products), err => {
            if (err) throw err;
            console.log('Producto actualizado con éxito desde updateProduct')
        });
    }




    /* async updateProduct (productId, field, updateData) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        
        const index = products.findIndex(product => product.id === productId);
        if (index === -1) {
            console.log('Error: producto no encontrado');
            return;
        }
        products[index][field] = updateData;

        fs.writeFile(this.path, JSON.stringify(products), err => {
            if (err) throw err;
            console.log('Producto actualizado con éxito desde updateProduct')
        });
    } */

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
        
    } */

}

module.exports = ProductManager;

