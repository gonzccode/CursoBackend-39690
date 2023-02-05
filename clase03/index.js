const path = require("path");
const ProductManager = require("./ProductManager");

const projectProducts = async () => {
    try {
        const pathDb = path.join(`${__dirname}/db.json`);
        const productManager = new ProductManager(pathDb);
        const listProducts = await productManager.getProduct();
        console.log("primer list", listProducts);
        
        console.log("-------------------------")

        /*ingresamos el primer producto*/
        await productManager.addProduct({
            title: 'producto prueba',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc123',
            stock: 25
        });

        /*mostrando el producto ingresado*/
       console.log("segundo list", listProducts);

        console.log("-------------------------")


    } catch (error) {
        console.log(error)
    }
}

projectProducts();