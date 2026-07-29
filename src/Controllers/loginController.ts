import { RequestHandler } from 'express';
import { Adm, AdmVerificacao} from '../model/Adm';

export const login: RequestHandler = async (_req, res) => {

    res.render('login');

};

export const loginAction: RequestHandler = async (req, res) => {
    const { usuario, senha } = req.body;
    try {
        if (await AdmVerificacao.VerificLogin(usuario, senha)) {
            //res.redirect('/admin');
            res.json({redirectUrl: '/adm'});
        } else {
            //res.redirect('/login');
            res.json({error: 'Usuario ou senha invalidos'});
        }
    } catch (error) {
        console.error('Erro no login controller:', error);
        //res.redirect('/login');
        res.json({error: 'Ocorreu um erro, tente novamente'});
    }
}

export const logout: RequestHandler = async (req, res) => {
    await AdmVerificacao.logoutAll();
    res.redirect('/login');
}