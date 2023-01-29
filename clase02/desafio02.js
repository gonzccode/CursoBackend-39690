class managerProduct {
	constructor() {
		this.products = [];
	}

	addProduct = ({ title, description, price, thumbnail, code, stock }) => {
		if (!title || !description || !price || !thumbnail || !code || !stock)
			return 'Todos los campos son obligatorios';
		if (
			title == ' ' || description == ' ' || price == ' ' || thumbnail == ' ' || code == ' ' || stock == ' '
		)
			return 'Todos los campos son obligatorios';
		const codeExists = this.products.some(product => product.code === code);
		if (codeExists) return '[!] Code already exists';
		const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
		this.products.push({ id, title, description, price, thumbnail, code, stock });
	};

	getProducts = () => this.products;
	getProductById = id => this.products.find(product => product.id === id) || 'No encontrado';
}

const productManager = new managerProduct();

console.log(productManager.getProducts());

productManager.addProduct({
	title: 'producto',
	description: 'Este es un producto',
	price: 150,
	thumbnail: 'Sin imagen',
	code: 'abc123',
	stock: 10
});