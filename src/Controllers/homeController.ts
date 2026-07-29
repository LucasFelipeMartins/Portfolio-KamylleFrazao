import { RequestHandler } from 'express';
import { Projetos } from '../model/Projetos';

export const home: RequestHandler = async (_req, res) => {
  try {

    const list = await Projetos.GetAll();
    const ProjetosJson = JSON.stringify(list);

    res.render('index', {
      ProjetosJson,
    });

  } catch (error) {

    console.error('Erro no home controller:', error);
    res.render('index', {
      ProjetosJson: '[]',
    });

  }
};
