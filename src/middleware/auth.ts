import { RequestHandler } from 'express';
import { Adm } from '../model/Adm';

export const privateRoute: RequestHandler = async (req, res, next) => {
    const user = await Adm.findOne({ Verificado: true }).lean().exec();

    if(user){
        next();
    }else{
        res.redirect('/login');
    }
}