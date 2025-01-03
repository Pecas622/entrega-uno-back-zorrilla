import express from 'express';
const router = express.Router();

let products = [
    { id: 1, title: 'Producto 1', description: 'Descripción 1', code: 'P001', price: 100, status: true, stock: 10, category: 'Categoria A', thumbnails: ['/img/product1.jpg'] },
    { id: 2, title: 'Producto 2', description: 'Descripción 2', code: 'P002', price: 150, status: true, stock: 15, category: 'Categoria B', thumbnails: ['/img/product2.jpg'] },
    { id: 3, title: 'Producto 3', description: 'Descripción 3', code: 'P003', price: 200, status: true, stock: 5, category: 'Categoria A', thumbnails: ['/img/product3.jpg'] },
    { id: 4, title: 'Producto 4', description: 'Descripción 4', code: 'P004', price: 250, status: true, stock: 7, category: 'Categoria C', thumbnails: ['/img/product4.jpg'] },
    { id: 5, title: 'Producto 5', description: 'Descripción 5', code: 'P005', price: 300, status: true, stock: 3, category: 'Categoria B', thumbnails: ['/img/product5.jpg'] }
];

// Ruta GET /api/products
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (limit && !isNaN(limit)) {
        return res.json(products.slice(0, limit));
    }
    res.json(products);
});

// Ruta GET /api/products/:pid
router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const product = products.find(p => p.id === parseInt(pid));
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
});

// Ruta POST /api/products
router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos excepto thumbnails son obligatorios' });
    }
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { id: newId, title, description, code, price, status: true, stock, category, thumbnails: thumbnails || [] };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Ruta PUT /api/products/:pid
router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    const productIndex = products.findIndex(p => p.id === parseInt(pid));
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const updatedProduct = { ...products[productIndex], title, description, code, price, stock, category, thumbnails };
    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
});

// Ruta DELETE /api/products/:pid
router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    const productIndex = products.findIndex(p => p.id === parseInt(pid));
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    products.splice(productIndex, 1);
    res.status(200).json({ message: 'Producto eliminado con éxito' });
});

export default router;
