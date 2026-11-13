import { RequestHandler } from 'express';
import { findUploadedFile } from '../services/uploadedFiles';

export const serveUploadedFile: RequestHandler = async (req, res, next) => {
    try {
        const file = await findUploadedFile(String(req.params.id));
        if (!file) return res.status(404).send('Arquivo não encontrado.');

        res.set('Cache-Control', 'public, max-age=31536000, immutable');
        res.type(file.contentType).send(file.data);
    } catch (error) {
        next(error);
    }
};
