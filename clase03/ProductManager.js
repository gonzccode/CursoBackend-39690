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
            const listProducts = await fs.readFile(this.path);
            return JSON.parse(listProducts);
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = ProductManager;