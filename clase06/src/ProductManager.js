const fs = require("fs/promises");

class ProductManager{
    constructor (db) {
        this.path = db;
        this.products = [];
    }

    addProduct = async ({title, description, price, thumbnail = "sin imagen", code, stock, status= true, category}) => {
        try {
            this.products = await this.getProduct();
            if (this.products.length == 0) {
                const id = 1
                this.products.push({id, title, description, price, thumbnail, code, stock, status, category })
                return await fs.writeFile(this.path, JSON.stringify(this.products))
            } else {
                const id = this.products.length + 1
                this.products.push({id, title, description, price, thumbnail, code, stock, status, category })
                return await fs.writeFile(this.path, JSON.stringify(this.products))
            }
        } catch(error) {
            return error
        }
    }  
    
    getProduct = async () => {
        try {
            this.products = await fs.readFile(this.path);
            return JSON.parse(this.products);
        } catch (error) {
            return error
        }
    }

    getProductById = async (id) => {
        try {
            this.products = await this.getProduct();
            const productFind = this.products.find(product => product.id === id);
            return productFind
        } catch (error) {
            return error
        }
        
    };

    updateProduct = async (id, data) => {
        try {
            this.products = await this.getProduct();
            const productFind = this.products.find(product => product.id === id);
            const productIndex = this.products.findIndex(product => product.id === id);
            this.products[productIndex] = { ...productFind, ...data};
            return await fs.writeFile(this.path, JSON.stringify(this.products)) 
        } catch (error) {
            return error
        }
    };

    deleteProduct = async (id) => {
        try {
            this.products = await this.getProduct();
            const productFind = this.products.find(product => product.id === id);
            if (productFind) {
                this.products = this.products.filter(product => product.id !== id);
                await fs.writeFile(this.path, JSON.stringify(this.products))
                return await this.getProduct();
            } else {
                return console.log('ERROR: Producto no encontrado')
            }
             
        } catch (error) {
            return error
        }
    }
};

module.exports = ProductManager;