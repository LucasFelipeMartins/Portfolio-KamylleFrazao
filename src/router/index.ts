import { Request, Response, Router } from 'express';
import { home } from '../Controllers/homeController';
import { login, loginAction, logout } from '../Controllers/loginController';
import {admin} from '../Controllers/admController'; 
import { privateRoute } from '../middleware/auth';

const router = Router();

router.get('/', home);

router.get('/login', login);
router.post('/login', loginAction);
router.get('/logout', logout);

router.get('/adm', privateRoute, admin);

export default router;
