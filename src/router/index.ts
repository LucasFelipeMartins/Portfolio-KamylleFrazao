import { Router } from 'express';
import rateLimit from 'express-rate-limit';
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

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
        res.status(429).json({ error: 'Muitas tentativas de login. Aguarde alguns minutos e tente novamente.' });
    },
});

router.get('/', home);

router.get('/login', login);
router.post('/login', loginLimiter, loginAction);
router.get('/logout', logout);

router.get('/adm', privateRoute, admin);

router.use('/admin/projetos', routerProjeto);
router.use('/admin/sobre', routerAbout);
router.use('/admin/servicos', routerServices);
router.use('/admin/depoimentos', routerDepoimento);

router.use('/api/contato', routerContato);

export default router;
