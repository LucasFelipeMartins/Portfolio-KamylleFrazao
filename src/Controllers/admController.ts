import { RequestHandler } from 'express';
import { Projetos } from '../model/Projetos';
import { Servico } from '../model/Servico';
import { Depoimento } from '../model/Depoimento';
import { Adm } from '../model/Adm';
import { unlink } from 'fs/promises';
import path from 'path';

export const admin: RequestHandler = async (_req, res) => {
    const [projetos, servicos, depoimentos, adm] = await Promise.all([
        Projetos.find().lean(),
        Servico.find().lean(),
        Depoimento.find().lean(),
        Adm.findOne().lean()
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
        formattedDate,
        adm
    });
};

// ... (rest of the functions from createProjeto to deleteDepoimento)

// Sobre Mim
export const updateSobreMim: RequestHandler = async (req, res) => {
    const { sobreMimTitulo, sobreMimTexto } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    try {
        const adm = await Adm.findOne();
        if (!adm) {
            // Handle case where Adm document doesn't exist
            // Maybe create one? For now, let's redirect with an error
            return res.redirect('/adm');
        }

        adm.sobreMimTitulo = sobreMimTitulo;
        adm.sobreMimTexto = sobreMimTexto;

        if (files.imgPrincipal) {
            const newImgPrincipal = `/assets/images/${files.imgPrincipal[0].filename}`;
            if (adm.imgPrincipal) {
                await unlink(path.join(__dirname, `../../public${adm.imgPrincipal}`)).catch(err => console.error("Failed to delete old imgPrincipal:", err));
            }
            adm.imgPrincipal = newImgPrincipal;
        }

        if (files.imgSecundaria) {
            const newImgSecundaria = `/assets/images/${files.imgSecundaria[0].filename}`;
            if (adm.imgSecundaria) {
                await unlink(path.join(__dirname, `../../public${adm.imgSecundaria}`)).catch(err => console.error("Failed to delete old imgSecundaria:", err));
            }
            adm.imgSecundaria = newImgSecundaria;
        }

        await adm.save();

    } catch (error) {
        console.error('Error updating sobre mim:', error);
    }

    res.redirect('/adm#about');
};


// Projeto
export const createProjeto: RequestHandler = async (req, res) => {
    const {
        'project-name': nome,
        'project-category': tipoDeProjeto,
        'project-location': location,
        'project-description': descricao
    } = req.body;

    const [cidade, estado] = location.split(',').map((item: string) => item.trim());
    
    let urlImagem = '';
    if (req.file) {
        urlImagem = `/assets/images/${req.file.filename}`;
    }

    const newProjeto = new Projetos({
        nome,
        tipoDeProjeto: tipoDeProjeto.toLowerCase(),
        endereco: {
            cidade,
            estado
        },
        descricao,
        urlImagem
    });

    await newProjeto.save();
    res.redirect('/adm');
};

export const editProjeto: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const projeto = await Projetos.findById(id).lean();
    
    if (projeto) {
        (projeto as any).isResidencial = projeto.tipoDeProjeto === 'residencial';
        (projeto as any).isInteriores = projeto.tipoDeProjeto === 'interiores';
        (projeto as any).isComercial = projeto.tipoDeProjeto === 'comercial';
    }

    const [projetos, servicos, depoimentos] = await Promise.all([
        Projetos.find().lean(),
        Servico.find().lean(),
        Depoimento.find().lean()
    ]);

    res.render('admin', {
        projetos,
        servicos,
        depoimentos,
        projeto,
        isEditingProjeto: true
    });
};

export const updateProjeto: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const {
        'project-name': nome,
        'project-category': tipoDeProjeto,
        'project-location': location,
        'project-description': descricao
    } = req.body;

    const [cidade, estado] = location.split(',').map((item: string) => item.trim());

    const updateData: any = {
        nome,
        tipoDeProjeto: tipoDeProjeto.toLowerCase(),
        endereco: {
            cidade,
            estado
        },
        descricao
    };

    if (req.file) {
        const projeto = await Projetos.findById(id);
        if (projeto && projeto.urlImagem) {
            await unlink(path.join(__dirname, `../../public${projeto.urlImagem}`));
        }
        updateData.urlImagem = `/assets/images/${req.file.filename}`;
    }

    await Projetos.findByIdAndUpdate(id, updateData);
    res.redirect('/adm');
};

export const deleteProjeto: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const projeto = await Projetos.findById(id);
    if (projeto && projeto.urlImagem) {
        await unlink(path.join(__dirname, `../../public${projeto.urlImagem}`));
    }
    await Projetos.findByIdAndDelete(id);
    res.redirect('/adm');
};

// Serviço
export const createServico: RequestHandler = async (req, res) => {
    const { nome, descricao, icone, ordem } = req.body;
    const newServico = new Servico({ nome, descricao, icone, ordem });
    await newServico.save();
    res.redirect('/adm');
};

export const editServico: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const servico = await Servico.findById(id).lean();
    const [projetos, servicos, depoimentos] = await Promise.all([
        Projetos.find().lean(),
        Servico.find().lean(),
        Depoimento.find().lean()
    ]);
    res.render('admin', {
        projetos,
        servicos,
        depoimentos,
        servico,
        isEditingServico: true
    });
};

export const updateServico: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, icone, ordem } = req.body;
    await Servico.findByIdAndUpdate(id, { nome, descricao, icone, ordem });
    res.redirect('/adm');
};

export const deleteServico: RequestHandler = async (req, res) => {
    const { id } = req.params;
    await Servico.findByIdAndDelete(id);
    res.redirect('/adm');
};

// Depoimento
export const createDepoimento: RequestHandler = async (req, res) => {
    const { nomeCliente, projeto, texto, ordem, avatar } = req.body;
    const newDepoimento = new Depoimento({ nomeCliente, projeto, texto, ordem, avatar });
    await newDepoimento.save();
    res.redirect('/adm');
};

export const editDepoimento: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const depoimento = await Depoimento.findById(id).lean();
    
    const [projetos, servicos, depoimentos] = await Promise.all([
        Projetos.find().lean(),
        Servico.find().lean(),
        Depoimento.find().lean()
    ]);

    res.render('admin', {
        projetos,
        servicos,
        depoimentos,
        depoimento,
        isEditingDepoimento: true
    });
};

export const updateDepoimento: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { nomeCliente, projeto, texto, ordem, avatar } = req.body;
    await Depoimento.findByIdAndUpdate(id, { nomeCliente, projeto, texto, ordem, avatar });
    res.redirect('/adm');
};

export const deleteDepoimento: RequestHandler = async (req, res) => {
    const { id } = req.params;
    await Depoimento.findByIdAndDelete(id);
    res.redirect('/adm');
};
