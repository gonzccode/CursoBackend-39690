const { Router } = require("express");
const router = Router();
const CartManager = require("../CartManager");
const ProductManager = require("../ProductManager");
const path = require("path");

router.get("/", async (request, response) => {
    const pathDb = path.join(`${__dirname}/../database/carts.json`);
    const cartManager = new CartManager(pathDb)
    const listCarts = await cartManager.getCart();
    return response.json({
        ok: true,
        message: 'lista de carritos exitoso',
        carts: listCarts
    })
});

router.get("/:cid", async (request, response) => {
    const pathDb = path.join(`${__dirname}/../database/carts.json`);
    const cartManager = new CartManager(pathDb);
    const cid = request.params.cid;
    const cart = await cartManager.getCartId(Number(cid));
    if(cart){
        return response.json({
            ok: true,
            message: 'carrito encontrado',
            cid: cid,
            cart: cart.products
        })
    } else {
        return response.json({
            ok: false,
            message: 'carrito no encontrado',
            cid: cid,
            cart: cart
        })
    }
    
});

router.post("/", async (request, response) => {
    const pathDb = path.join(`${__dirname}/../database/carts.json`);
    const cartManager = new CartManager(pathDb);
    const cartBody = request.body
    const cart = await cartManager.addCart();
    return response.json({
        ok:true,
        message: 'carrito creado',
        cart: cart
    })
});

router.post("/:cid/product/:pid", async (request, response) => {
    const pathCart = path.join(`${__dirname}/../database/carts.json`);
    const pathProduct = path.join(`${__dirname}/../database/products.json`);
    const cartManager = new CartManager(pathCart);
    const productManager = new ProductManager(pathProduct);
    const cid = request.params.cid;
    const pid = request.params.pid;
    const product = await productManager.getProductById(Number(pid));
    const cart = await cartManager.addCartProduct(Number(cid), Number(pid))
    return response.json({
        ok: true,
        message: `agregado exitosamente a carrito ${cid} el producto ${pid}`,
        cid: cid,
        pid: pid,
        product: product,
        cart: cart
    })
});



module.exports = router;