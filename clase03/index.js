const path = require("path");
const ProductManager = require("./ProductManager");

const projectProducts = async () => {
    try {
        const pathDb = path.join(`${__dirname}/db.json`);
        const productManager = new ProductManager(pathDb);
        let listProducts = await productManager.getProduct();
        console.log("primer getproduct")
        console.log(listProducts);
        
        console.log("-------------------------")
        console.log("addproduct")
        /*ingresamos el primer producto*/
        await productManager.addProduct({
            title: 'producto prueba',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc123',
            stock: 25
        });

        await console.log("-------------------------")

        console.log("segundo getproduct")

        /*mostrando el producto ingresado*/
        listProducts = await productManager.getProduct();

        console.log(listProducts);

        console.log("-------------------------")
        console.log("getProductById id=1")

        await productManager.getProductById(1);

        console.log("-------------------------")

        console.log("producto actualizado");

        await productManager.updateProduct(1, {
            title: 'producto actualizado',
            description: 'description actualizada'
        })

        /*mostrando el producto ingresado*/
        listProducts = await productManager.getProduct();

        console.log(listProducts);

        console.log("-------------------------")

        console.log("producto eliminado");

        await productManager.deleteProduct(1);

        console.log("-------------------------")


    } catch (error) {
        console.log(error)
    }
}

projectProducts();