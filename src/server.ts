import express, { Request, Response } from 'express';
import path from 'path';
import mustache from 'mustache-express';
import dotenv from 'dotenv';
import mainRouter from './router/index';
import { mongoConnect } from './database/mongo';
import methodOverride from 'method-override';

import Session from 'express-session';

dotenv.config()

mongoConnect()

const server = express()

server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, '../src/view'));
server.engine('mustache', mustache());

server.use(methodOverride('_method'));

server.use(express.static(path.join(__dirname, '../public')));

server.use(express.json());
server.use(express.urlencoded({extended: true}));

// Adicione a configuração da sessão aqui
server.use(Session({
        secret: process.env.SESSION_SECRET || 'a-secret-key-that-is-long-and-random', // TODO: Mova para variáveis de ambiente
        resave: false,
        saveUninitialized: false
    }));

server.use(mainRouter);

server.use((req: Request, res: Response)=>{
    res.status(404).send('Página não encontrada!');
});

server.listen(process.env.PORT)