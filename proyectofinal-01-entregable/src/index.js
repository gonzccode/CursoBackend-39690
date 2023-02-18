const express = require("express");
const productsRoutes = require("./routes/products.routes");
const cartsRoutes = require("./routes/carts.routes");

const PORT = 8080;
const app = express();
const BASE_PREFIX = "api";

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(`/${BASE_PREFIX}/products`, productsRoutes);
app.use(`/${BASE_PREFIX}/carts`, cartsRoutes);


app.listen(PORT, () => {
    console.log(`Api Running on PORT ${PORT}`);
})