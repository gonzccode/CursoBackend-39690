const { Router } = require("express");
const router = Router();
const ProductManager = require("../ProductManager");
const path = require("path");


router.get("/", async (request, response) => {
    const pathDb = path.join(`${__dirname}/../database/products.json`);
    const productManager = new ProductManager(pathDb);
    const { limit } = request.query;
    const listProducts = await productManager.getProduct();

    if(limit) {
        if(Number(limit) > listProducts.length || Number(limit) < 0){
            return response.json({
                ok: false,
                message: 'ERROR: el limite ingresado está fuera de rango',
                limit: limit,
                queryParams: request.query
            })
        } else {
            let limitPorducts = listProducts.filter( product => product.id < limit)
            return response.send(limitPorducts);
        }
    } else {
        return response.send(listProducts);
    }
    
});

router.get("/:pid", async (request, response) => {
    const pathDb = path.join(`${__dirname}/../database/products.json`);
    const productManager = new ProductManager(pathDb);
    const pid = request.params.pid;
    const product = await productManager.getProductById(Number(pid));
    console.log("getproduct id", product)
    if(product) {
        return response.send(product);
    } else {
        return response.json({
            ok: false,
            message: 'ERROR: El id ingresado está fuera de rango',
            id: pid,
            params: request.params
        })
    }
});

router.post("/", async (request, response) => {
    const pathDb = path.join(`${__dirname}/../database/products.json`);
    const productManager = new ProductManager(pathDb);
    const productBody = request.body;
    const {title, description, price, code, stock, category} = productBody
    if (!title || !description || !price || !code || !stock || !category) {
        return response.json({
            ok: false,
            message: 'ERROR: Debes completar todo los campos',
            product: productBody
        })
    } else if (title == "" || description == "" || price == "" || code == "" || stock == "" || category == "" ) {
        return response.json({
            ok: false,
            message: 'ERROR: Debes completar todo los campos',
            product: productBody
        })
    } else {
        await productManager.addProduct(productBody)
        const listProducts = await productManager.getProduct();
        return response.json({
            ok:true,
            message: 'producto creado correctamente',
            products: listProducts
        })
    }
});

router.put("/:pid", async (request, response) => {
    const pathDb = path.join(`${__dirname}/../database/products.json`);
    const productManager = new ProductManager(pathDb);
    const pid = request.params.pid;
    const productBody = request.body;
    await productManager.updateProduct(Number(pid), productBody);
    const listProducts = await productManager.getProduct();
    return response.json({
        ok: true,
        message: `producto ${pid} actualizado`,
        pid: pid,
        products: listProducts
    });

});

router.delete("/:pid", async (request, response) => {
    const pathDb = path.join(`${__dirname}/../database/products.json`);
    const productManager = new ProductManager(pathDb);
    const pid = request.params.pid;
    const productDelete = await productManager.deleteProduct(Number(pid));
    const listProducts = await productManager.getProduct();
    
    if(productDelete) {
        return response.json({
            ok: true,
            message: `producto ${pid} eliminado`,
            pid: pid,
            products: listProducts
        });
    } else {
        return response.json({
            ok: false,
            message: 'ERROR: El id ingresado está fuera de rango',
            id: pid
        })
    }
});



module.exports = router;