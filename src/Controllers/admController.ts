import { RequestHandler } from 'express';

export const admin: RequestHandler = async (_req, res) => {
    res.render('admin');
};