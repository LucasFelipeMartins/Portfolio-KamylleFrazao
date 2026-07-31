import { Router } from 'express';
import { privateRoute } from '../middleware/auth';
import { uploadFields } from '../middleware/multer';
import { updateSobreMim } from '../Controllers/admController';

const routerAbout = Router();

routerAbout.post('/', privateRoute, uploadFields, updateSobreMim);

export default routerAbout;
