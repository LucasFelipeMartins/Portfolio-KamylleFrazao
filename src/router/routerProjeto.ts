import { Router } from 'express';
import { privateRoute } from '../middleware/auth';
import { upload } from '../middleware/multer';
import { createProjeto, editProjeto, updateProjeto, deleteProjeto } from '../Controllers/admController';

const routerProjeto = Router();

routerProjeto.post('/', privateRoute, upload.single('image'), createProjeto);
routerProjeto.get('/:id', privateRoute, editProjeto);
routerProjeto.post('/:id', privateRoute, upload.single('image'), updateProjeto);
routerProjeto.delete('/:id', privateRoute, deleteProjeto);

export default routerProjeto;
