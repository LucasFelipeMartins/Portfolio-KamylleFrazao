import { RequestHandler } from 'express';
import { Projetos } from '../model/Projetos';
import { Servico } from '../model/Servico';
import { Depoimento } from '../model/Depoimento';
import { Adm } from '../model/Adm';
import { Mensagem } from '../model/Mensagem';
import { tipoDeprojeto } from '../types/projeto';

export const admin: RequestHandler = async (req, res) => {
    const [projetos, servicos, depoimentos, adm, messageCount] = await Promise.all([
        Projetos.GetAll(),
        Servico.GetAll(),
        Depoimento.GetAll(),
        Adm.GetDados(),
        Mensagem.Count()
    ]);

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = today.toLocaleDateString('pt-BR', options)
        .replace(/^\w/, (c) => c.toUpperCase())
        .replace(/ de /g, ' DE ');

    res.render('admin', {
        projetos,
        servicos,
        depoimentos,
        projectCount: projetos.length,
        serviceCount: servicos.length,
        testimonialCount: depoimentos.length,
        messageCount,
        formattedDate,
        adm,
        csrfToken: req.session.csrfToken
    });
};

// Sobre Mim
export const updateSobreMim: RequestHandler = async (req, res) => {
    const { sobreMimTitulo, sobreMimTexto } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    try {
        const novasImagens = {
            imgPrincipal: files.imgPrincipal ? `/assets/images/${files.imgPrincipal[0].filename}` : undefined,
            imgSecundaria: files.imgSecundaria ? `/assets/images/${files.imgSecundaria[0].filename}` : undefined,
            portfolioUrl: files.portfolio ? `/assets/images/${files.portfolio[0].filename}` : undefined
        };

        await Adm.UpdateSobreMim({ sobreMimTitulo, sobreMimTexto }, novasImagens);

    } catch (error) {
        console.error('Error updating sobre mim:', error);
    }

    res.redirect('/adm#about');
};


// Projeto
export const createProjeto: RequestHandler = async (req, res) => {
    const body = req.body as {
        'project-name': string;
        'project-category': string;
        'project-location': string;
        'project-description': string;
    };

    const [cidade, estado] = body['project-location'].split(',').map((item: string) => item.trim());

    const urlImagem = req.file ? `/assets/images/${req.file.filename}` : '';

    await Projetos.Create({
        nome: body['project-name'],
        tipoDeProjeto: body['project-category'].toLowerCase() as tipoDeprojeto,
        endereco: {
            cidade,
            estado
        },
        descricao: body['project-description'],
        urlImagem
    });

    res.redirect('/adm');
};

export const editProjeto: RequestHandler = async (req, res) => {
    const id = String(req.params.id);
    const projeto = await Projetos.GetById(id);

    if (projeto) {
        (projeto as any).isResidencial = projeto.tipoDeProjeto === 'residencial';
        (projeto as any).isInteriores = projeto.tipoDeProjeto === 'interiores';
        (projeto as any).isComercial = projeto.tipoDeProjeto === 'comercial';
    }

    const [projetos, servicos, depoimentos] = await Promise.all([
        Projetos.GetAll(),
        Servico.GetAll(),
        Depoimento.GetAll()
    ]);

    res.render('admin', {
        projetos,
        servicos,
        depoimentos,
        projeto,
        isEditingProjeto: true,
        csrfToken: req.session.csrfToken
    });
};

export const updateProjeto: RequestHandler = async (req, res) => {
    const id = String(req.params.id);
    const body = req.body as {
        'project-name': string;
        'project-category': string;
        'project-location': string;
        'project-description': string;
    };

    const [cidade, estado] = body['project-location'].split(',').map((item: string) => item.trim());

    await Projetos.UpdateById(id, {
        nome: body['project-name'],
        tipoDeProjeto: body['project-category'].toLowerCase() as tipoDeprojeto,
        endereco: {
            cidade,
            estado
        },
        descricao: body['project-description']
    }, req.file ? `/assets/images/${req.file.filename}` : undefined);

    res.redirect('/adm');
};

export const deleteProjeto: RequestHandler = async (req, res) => {
    const id = String(req.params.id);
    await Projetos.DeleteById(id);
    res.redirect('/adm');
};

// Serviço
export const createServico: RequestHandler = async (req, res) => {
    const body = req.body as { nome: string; descricao: string; icone: string; ordem: string };
    await Servico.Create({ nome: body.nome, descricao: body.descricao, icone: body.icone, ordem: Number(body.ordem) });
    res.redirect('/adm');
};

export const editServico: RequestHandler = async (req, res) => {
    const id = String(req.params.id);
    const servico = await Servico.GetById(id);
    const [projetos, servicos, depoimentos] = await Promise.all([
        Projetos.GetAll(),
        Servico.GetAll(),
        Depoimento.GetAll()
    ]);
    res.render('admin', {
        projetos,
        servicos,
        depoimentos,
        servico,
        isEditingServico: true,
        csrfToken: req.session.csrfToken
    });
};

export const updateServico: RequestHandler = async (req, res) => {
    const id = String(req.params.id);
    const body = req.body as { nome: string; descricao: string; icone: string; ordem: string };
    await Servico.UpdateById(id, { nome: body.nome, descricao: body.descricao, icone: body.icone, ordem: Number(body.ordem) });
    res.redirect('/adm');
};

export const deleteServico: RequestHandler = async (req, res) => {
    const id = String(req.params.id);
    await Servico.DeleteById(id);
    res.redirect('/adm');
};

// Depoimento
export const createDepoimento: RequestHandler = async (req, res) => {
    const body = req.body as { nomeCliente: string; projeto: string; texto: string; ordem: string; avatar: string };
    await Depoimento.Create({ nomeCliente: body.nomeCliente, projeto: body.projeto, texto: body.texto, ordem: Number(body.ordem), avatar: body.avatar });
    res.redirect('/adm');
};

export const editDepoimento: RequestHandler = async (req, res) => {
    const id = String(req.params.id);
    const depoimento = await Depoimento.GetById(id);

    const [projetos, servicos, depoimentos] = await Promise.all([
        Projetos.GetAll(),
        Servico.GetAll(),
        Depoimento.GetAll()
    ]);

    res.render('admin', {
        projetos,
        servicos,
        depoimentos,
        depoimento,
        isEditingDepoimento: true,
        csrfToken: req.session.csrfToken
    });
};

export const updateDepoimento: RequestHandler = async (req, res) => {
    const id = String(req.params.id);
    const body = req.body as { nomeCliente: string; projeto: string; texto: string; ordem: string; avatar: string };
    await Depoimento.UpdateById(id, { nomeCliente: body.nomeCliente, projeto: body.projeto, texto: body.texto, ordem: Number(body.ordem), avatar: body.avatar });
    res.redirect('/adm');
};

export const deleteDepoimento: RequestHandler = async (req, res) => {
    const id = String(req.params.id);
    await Depoimento.DeleteById(id);
    res.redirect('/adm');
};
