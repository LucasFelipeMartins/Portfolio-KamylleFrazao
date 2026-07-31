import { Router } from 'express';
import { home } from '../Controllers/homeController';
import { login, loginAction, logout } from '../Controllers/loginController';
import * as admController from '../Controllers/admController';
import { privateRoute } from '../middleware/auth';

const router = Router();

router.get('/', home);

router.get('/login', login);
router.post('/login', loginAction);
router.get('/logout', logout);

router.get('/adm', privateRoute, admController.admin);

// Rotas para Projetos
import { upload, uploadFields } from '../middleware/multer';
router.post('/admin/projetos', privateRoute, upload.single('image'), admController.createProjeto);
router.get('/admin/projetos/:id', privateRoute, admController.editProjeto);
router.post('/admin/projetos/:id', privateRoute, upload.single('image'), admController.updateProjeto);
router.delete('/admin/projetos/:id', privateRoute, admController.deleteProjeto);

// Rota para Sobre Mim
router.post('/admin/sobre', privateRoute, uploadFields, admController.updateSobreMim);

// Rotas para Serviços
router.post('/admin/servicos', privateRoute, admController.createServico);
router.get('/admin/servicos/:id', privateRoute, admController.editServico);
router.post('/admin/servicos/:id', privateRoute, admController.updateServico);
router.delete('/admin/servicos/:id', privateRoute, admController.deleteServico);

// Rotas para Depoimentos
router.post('/admin/depoimentos', privateRoute, admController.createDepoimento);
router.get('/admin/depoimentos/:id', privateRoute, admController.editDepoimento);
router.post('/admin/depoimentos/:id', privateRoute, admController.updateDepoimento);
router.delete('/admin/depoimentos/:id', privateRoute, admController.deleteDepoimento);

export default router;
