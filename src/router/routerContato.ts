import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { EnviarEmailContato } from '../services/mailer';
import { Mensagem } from '../model/Mensagem';

const routerContato = Router();

const contatoLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
        res.status(429).json({ success: false, error: 'Muitas mensagens enviadas. Aguarde alguns minutos e tente novamente.' });
    },
});

routerContato.post('/', contatoLimiter, async (req, res) => {
    const { nome, email, telefone, mensagem } = (req.body ?? {}) as Record<string, unknown>;

    const nomeStr = String(nome ?? '').trim();
    const emailStr = String(email ?? '').trim();
    const telefoneStr = String(telefone ?? '').trim();
    const mensagemStr = String(mensagem ?? '').trim();

    const erros: string[] = [];

    if (nomeStr.length < 2) {
        erros.push('O campo "nome" é obrigatório.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
        erros.push('Informe um e-mail válido.');
    }

    if (telefoneStr && telefoneStr.replace(/\D/g, '').length < 10) {
        erros.push('Informe um telefone válido.');
    }

    if (mensagemStr.length < 10) {
        erros.push('A mensagem deve ter pelo menos 10 caracteres.');
    }

    if (erros.length > 0) {
        return res.status(400).json({ success: false, error: erros });
    }

    try {
        await EnviarEmailContato({
            nome: nomeStr,
            email: emailStr,
            telefone: telefoneStr || undefined,
            mensagem: mensagemStr,
        });

        try {
            await Mensagem.Create({
                nome: nomeStr,
                email: emailStr,
                telefone: telefoneStr || undefined,
                mensagem: mensagemStr,
            });
        } catch (error) {
            console.error('Erro ao salvar mensagem no banco:', error);
        }

        res.json({ success: true, message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.' });

    } catch (error) {
        console.error('Erro ao enviar e-mail de contato:', error);
        res.status(500).json({ success: false, error: 'Não foi possível enviar a mensagem. Tente novamente.' });
    }
});

export default routerContato;
