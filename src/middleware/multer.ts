import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, './public/assets/images');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const randomName = Math.floor(Math.random() * 999999);
        cb(null, `${randomName}_${Date.now()}_${file.originalname}`);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type.'));
    }
};

export const upload = multer({
    storage,
    fileFilter
});

export const uploadFields = multer({
    storage,
    fileFilter
}).fields([
    { name: 'imgPrincipal', maxCount: 1 },
    { name: 'imgSecundaria', maxCount: 1 },
    { name: 'portfolio', maxCount: 1 }
]);
