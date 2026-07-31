import { Router } from 'express';
import { privateRoute } from '../middleware/auth';
import { createDepoimento, editDepoimento, updateDepoimento, deleteDepoimento } from '../Controllers/admController';

const routerDepoimento = Router();

routerDepoimento.post('/', privateRoute, createDepoimento);
routerDepoimento.get('/:id', privateRoute, editDepoimento);
routerDepoimento.post('/:id', privateRoute, updateDepoimento);
routerDepoimento.delete('/:id', privateRoute, deleteDepoimento);

export default routerDepoimento;
