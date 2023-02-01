class ProductManager {
    constructor(){
        this.products = []
    }
    /*metodo addPrudct*/
    addProduct = ({title, description, price, thumbnail, code, stock}) => {
        /*se verifica si algunos de los valores no están siendo ingresado*/
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return "ERROR: Debes completar todo los campos"
        } else if (title == "" || description == "" || price == "" || thumbnail == "" || code == "" || stock == "") {
            return "ERROR: Debes completar todo los campos"
        } else {
            /*si los valores están completos entonces agregar el primer producto si el array está vacío*/
            if (this.products.length == 0) {
                const id = 1
                this.products.push({id, title, description, price, thumbnail, code, stock })
            } else if (this.products.length > 0){
                /*se van agregando los demas producto con el id autoincrementable*/
                const id = this.products.length + 1
                /*se verifica si el código existe*/
                const codeExists = this.products.some(product => product.code === code)
                if (codeExists) {
                    console.error("ERROR: Ingresa otro código, este ya existe")
                } else {
                    this.products.push({id, title, description, price, thumbnail, code, stock })
                }
            }
        }
    }

    getProducts = () => this.products;
    getProductById = id => this.products.find(product => product.id === id) || 'ERROR: Producto no encontrado';
}

const productManager = new ProductManager();

console.log("-------------------------")
/*hacemos la muestra del array producto vacio*/
console.log(productManager.getProducts())

console.log("-------------------------")

/*ingresamos el primer producto*/
productManager.addProduct({
	title: 'producto prueba',
	description: 'Este es un producto prueba',
	price: 200,
	thumbnail: 'Sin imagen',
	code: 'abc123',
	stock: 25
});

/*mostrando el producto ingresado*/
console.log(productManager.getProducts());

console.log("-------------------------")

/*probando si el codigo se repite*/
productManager.addProduct({
	title: 'producto prueba',
	description: 'Este es un producto prueba',
	price: 200,
	thumbnail: 'Sin imagen',
	code: 'abc123',
	stock: 25
});

console.log("-------------------------")
/*buscando producto*/
/*producto no encontrado*/
console.error(productManager.getProductById(3));
console.log("-------------------------")
/*producto enconntrado*/
console.log(productManager.getProductById(1));

console.log("-------------------------")
/*agregando nuevo producto*/
productManager.addProduct({
	title: 'producto prueba 2',
	description: 'Este es un producto prueba 2',
	price: 100,
	thumbnail: 'Con imagen',
	code: 'abc456',
	stock: 15
});

/*mostrando el producto ingresado*/
console.log(productManager.getProducts());