import multer from 'multer';
import { Request } from 'express';
const ALLOWED_MIME_TYPES = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'application/pdf': '.pdf'
};

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimes = Object.keys(ALLOWED_MIME_TYPES);
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type.'));
    }
};

const uploadOptions = {
    storage: multer.memoryStorage(),
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
};

export const upload = multer(uploadOptions);

export const uploadFields = multer(uploadOptions).fields([
    { name: 'imgPrincipal', maxCount: 1 },
    { name: 'imgSecundaria', maxCount: 1 },
    { name: 'portfolio', maxCount: 1 }
]);
