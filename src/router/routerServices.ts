import { Router } from 'express';
import { privateRoute } from '../middleware/auth';
import { createServico, editServico, updateServico, deleteServico } from '../Controllers/admController';

const routerServices = Router();

routerServices.post('/', privateRoute, createServico);
routerServices.get('/:id', privateRoute, editServico);
routerServices.post('/:id', privateRoute, updateServico);
routerServices.delete('/:id', privateRoute, deleteServico);

export default routerServices;
