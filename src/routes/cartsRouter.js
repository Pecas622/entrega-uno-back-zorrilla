import express from 'express';
const router = express.Router();

// Lista de carritos de ejemplo (simulando una base de datos)
let carts = [
    { id: 1, products: [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 1 }] },
    { id: 2, products: [{ productId: 3, quantity: 1 }] }
];

// Ruta POST para crear un nuevo carrito
router.post('/', (req, res) => {
    const { products } = req.body;

    if (!Array.isArray(products)) {
        return res.status(400).json({ error: 'El campo "products" debe ser un array' });
    }

    const newId = carts.length ? carts[carts.length - 1].id + 1 : 1;
    const newCart = { id: newId, products };
    carts.push(newCart);

    res.status(201).json(newCart);
});

// Ruta GET para obtener un carrito por ID
router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = carts.find(cart => cart.id === parseInt(cid));

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(cart);
});

// Ruta POST para agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!quantity || isNaN(quantity)) {
        return res.status(400).json({ error: 'La cantidad es obligatoria y debe ser un número' });
    }

    const cart = carts.find(cart => cart.id === parseInt(cid));

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const productIndex = cart.products.findIndex(product => product.productId === parseInt(pid));

    if (productIndex !== -1) {
        cart.products[productIndex].quantity += parseInt(quantity);
    } else {
        cart.products.push({ productId: parseInt(pid), quantity: parseInt(quantity) });
    }

    res.status(200).json(cart);
});

// Exportar el router
export default router;
