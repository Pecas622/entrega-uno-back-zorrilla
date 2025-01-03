import express from 'express';
import cartsRouter from './routes/cartsRouter.js';

const app = express();
app.use(express.json());

app.use('/api/carts', cartsRouter);

app.listen(8080, () => {
    console.log('Servidor escuchando en http://localhost:8080');
});
