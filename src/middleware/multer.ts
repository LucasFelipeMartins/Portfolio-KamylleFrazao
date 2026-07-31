import multer from 'multer';
import { Request } from 'express';
import crypto from 'crypto';
import path from 'path';

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, './public/assets/images');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const safeExt = ALLOWED_EXTENSIONS.includes(ext) ? ext : file.mimetype === 'image/png' ? '.png' : '.jpg';
        const randomName = crypto.randomBytes(16).toString('hex');
        cb(null, `${randomName}${safeExt}`);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type.'));
    }
};

const uploadOptions = {
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
};

export const upload = multer(uploadOptions);

export const uploadFields = multer(uploadOptions).fields([
    { name: 'imgPrincipal', maxCount: 1 },
    { name: 'imgSecundaria', maxCount: 1 }
]);
