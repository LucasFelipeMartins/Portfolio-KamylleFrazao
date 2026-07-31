import { Router } from 'express';
import { home } from '../Controllers/homeController';
import { login, loginAction, logout } from '../Controllers/loginController';
import { admin } from '../Controllers/admController';
import { privateRoute } from '../middleware/auth';
import routerProjeto from './routerProjeto';
import routerAbout from './routerAbout';
import routerServices from './routerServices';
import routerDepoimento from './routerDepoimento';
import routerContato from './routerContato';

const router = Router();

router.get('/', home);

router.get('/login', login);
router.post('/login', loginAction);
router.get('/logout', logout);

router.get('/adm', privateRoute, admin);

router.use('/admin/projetos', routerProjeto);
router.use('/admin/sobre', routerAbout);
router.use('/admin/servicos', routerServices);
router.use('/admin/depoimentos', routerDepoimento);

router.use('/api/contato', routerContato);

export default router;
