import { Router } from 'express';
import { privateRoute } from '../middleware/auth';
import { csrfProtect } from '../middleware/csrf';
import { uploadFields } from '../middleware/multer';
import { updateSobreMim } from '../Controllers/admController';

const routerAbout = Router();

routerAbout.post('/', privateRoute, uploadFields, csrfProtect, updateSobreMim);

export default routerAbout;
