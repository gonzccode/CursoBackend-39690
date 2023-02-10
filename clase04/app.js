const express = require("express");
const ProductManager = require("./ProductManager");
const path = require("path");
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
    response.send(`Hola, soy el Desafio 03, el puerto es ${PORT}`);
});

app.get("/products", async (request, response) => {
    const pathDb = path.join(`${__dirname}/db.json`);
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

app.get("/products/:pid", async (request, response) => {
    const pathDb = path.join(`${__dirname}/db.json`);
    const productManager = new ProductManager(pathDb);
    const pid = request.params.pid;
    const product = await productManager.getProductById(Number(pid));

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


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});

