import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import mustache from 'mustache-express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mainRouter from './router/index';
import { mongoConnect } from './database/mongo';
import methodOverride from 'method-override';

import Session from 'express-session';
import multer from 'multer';
import { csrfProtect, csrfToken } from './middleware/csrf';

dotenv.config()

if (!process.env.SESSION_SECRET) {
    throw new Error('A variável de ambiente SESSION_SECRET é obrigatória. Defina-a no arquivo .env');
}

mongoConnect()

const server = express()

server.set('trust proxy', process.env.NODE_ENV === 'production' ? 1 : 0);

server.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            imgSrc: ["'self'", 'data:', 'blob:'],
            connectSrc: ["'self'"],
            objectSrc: ["'none'"],
            frameAncestors: ["'self'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
        },
    },
}));

server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, '../src/view'));
server.engine('mustache', mustache());

server.use(methodOverride('_method'));

server.use(express.static(path.join(__dirname, '../public')));

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(Session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }
    }));

server.use(csrfToken);
server.use(csrfProtect);

server.use(mainRouter);

server.use((req: Request, res: Response) => {
    res.status(404).send('Página não encontrada!');
});

server.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    console.error('Erro não tratado:', err);

    const isApi = req.path.startsWith('/api');
    const status = (err as any).status ?? (err as any).statusCode;

    if (status === 400) {
        if (isApi) {
            return res.status(400).json({ success: false, error: 'JSON inválido no corpo da requisição.' });
        }
        return res.status(400).redirect('/adm');
    }

    if (err instanceof multer.MulterError || err.message === 'Invalid file type.') {
        let mensagem = 'Tipo de arquivo inválido. Use JPG ou PNG.';
        if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
            mensagem = 'O arquivo excede o tamanho máximo de 5MB.';
        }
        if (isApi) {
            return res.status(400).json({ success: false, error: mensagem });
        }
        return res.status(400).redirect('/adm');
    }

    if (isApi) {
        return res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
    }
    res.status(500).send('Erro interno do servidor.');
});

server.listen(process.env.PORT)
