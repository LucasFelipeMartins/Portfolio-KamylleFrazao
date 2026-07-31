import { RequestHandler } from 'express';

export const privateRoute: RequestHandler = (req, res, next) => {
    if (req.session && req.session.user) {
        // Se o usuário estiver na sessão, permita o acesso
        next();
    } else {
        // Se não houver usuário na sessão, redirecione para o login
        res.redirect('/login');
    }
};