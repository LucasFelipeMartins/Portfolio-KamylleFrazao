import { Request, Response, Router } from 'express';
import { home } from '../Controllers/homeController';

const router = Router();

router.get('/', home);

router.get('/login', (_req: Request, res: Response) => {
  res.render('login');
});

router.get('/adm', (_req: Request, res: Response) => {
  res.render('admin');
});

export default router;
