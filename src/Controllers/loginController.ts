import { RequestHandler } from 'express';
import { Adm, AdmVerificacao } from '../model/Adm';

export const login: RequestHandler = async (_req, res) => {
    res.render('login');
};

export const loginAction: RequestHandler = async (req, res) => {
    const { usuario, senha } = req.body;
    try {
        const user = await AdmVerificacao.VerificLogin(usuario, senha);
        if (user) {
            req.session.user = user;
            res.json({ redirectUrl: '/adm' });
        } else {
            res.json({ error: 'Usuario ou senha invalidos' });
        }
    } catch (error) {
        console.error('Erro no login controller:', error);
        res.json({ error: 'Ocorreu um erro, tente novamente' });
    }
}

export const logout: RequestHandler = async (req, res) => {
    req.session.destroy((err: any) => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
            // Mesmo com erro, tentamos redirecionar o usuário
            res.redirect('/login');
        } else {
            res.clearCookie('connect.sid'); // Limpa o cookie da sessão
            res.redirect('/login');
        }
    });
}