import { RequestHandler } from 'express';
import crypto from 'crypto';

const MUTABLE_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

const isMultipartForm = (req: Parameters<RequestHandler>[0]) =>
    req.is('multipart/form-data');

export const csrfToken: RequestHandler = (req, _res, next) => {
    if (!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(32).toString('hex');
    }
    next();
};

export const csrfProtect: RequestHandler = (req, res, next) => {
    if (!MUTABLE_METHODS.includes(req.method)) {
        return next();
    }

    // O campo _csrf de formulários multipart só é disponibilizado depois que o
    // Multer processa a requisição. Nesses casos, a mesma proteção é executada
    // na rota, logo após o middleware de upload.
    if (isMultipartForm(req) && !req.body?._csrf) {
        return next();
    }

    const sentToken = req.body?._csrf ?? req.headers['x-csrf-token'] ?? req.query?._csrf;

    if (!sentToken || sentToken !== req.session.csrfToken) {
        if (req.path.startsWith('/api')) {
            return res.status(403).json({ success: false, error: 'Token CSRF inválido ou ausente.' });
        }
        return res.status(403).send('Requisição inválida. Token CSRF ausente ou incorreto.');
    }

    next();
};
