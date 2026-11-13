import { Router } from 'express';
import { privateRoute } from '../middleware/auth';
import { csrfProtect } from '../middleware/csrf';
import { upload } from '../middleware/multer';
import { createProjeto, editProjeto, updateProjeto, deleteProjeto } from '../Controllers/admController';

const routerProjeto = Router();

routerProjeto.post('/', privateRoute, upload.single('image'), csrfProtect, createProjeto);
routerProjeto.get('/:id', privateRoute, editProjeto);
routerProjeto.post('/:id', privateRoute, upload.single('image'), csrfProtect, updateProjeto);
routerProjeto.delete('/:id', privateRoute, deleteProjeto);

export default routerProjeto;
