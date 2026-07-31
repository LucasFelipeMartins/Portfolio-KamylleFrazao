import { RequestHandler } from 'express';
import { Projetos } from '../model/Projetos';
import { Adm } from '../model/Adm';
import { Servico } from '../model/Servico';
import { Depoimento } from '../model/Depoimento';

export const home: RequestHandler = async (_req, res) => {
  try {
    const [adm, projetos, servicos, depoimentos] = await Promise.all([
      Adm.GetDados(),
      Projetos.GetAll(),
      Servico.GetAll(),
      Depoimento.GetAll()
    ]);

    if (depoimentos.length > 0) {
      (depoimentos[0] as any).isVisible = true;
    }

    res.render('index', {
      adm,
      projetos,
      servicos,
      depoimentos
    });

  } catch (error) {

    console.error('Erro no home controller:', error);
    res.render('index', {
      projetos: [],
      adm: null,
      servicos: [],
      depoimentos: []
    });

  }
};
