const fs = require("fs/promises");

class ProductManager{
    constructor (db) {
        this.path = db;
        this.products = [];
    }

    addProduct = async ({title, description, price, thumbnail, code, stock}) => {
        try {
            this.products = await this.getProduct();
            if (this.products.length == 0) {
                const id = 1
                this.products.push({id, title, description, price, thumbnail, code, stock })
                return await fs.writeFile(this.path, JSON.stringify(this.products))
            } else {
                const id = this.products.length + 1
                this.products.push({id, title, description, price, thumbnail, code, stock })
                return await fs.writeFile(this.path, JSON.stringify(this.products))
            }
        } catch(error) {
            console.log(error)
        }
    }  
    
    getProduct = async () => {
        try {
            this.products = await fs.readFile(this.path);
            return JSON.parse(this.products);
        } catch (error) {
            console.log(error)
        }
    }

    getProductById = async (id) => {
        try {
            this.products = await this.getProduct();
            const productFind = this.products.find(product => product.id === id);
            return productFind
        } catch (error) {
            console.log(error, 'ERROR: Producto no encontrado')
        }
        
    };
};

module.exports = ProductManager;