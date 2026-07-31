import nodemailer, { Transporter } from 'nodemailer';

export interface ContatoDados {
    nome: string;
    email: string;
    telefone?: string;
    mensagem: string;
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    return transporter;
}

function escapeHtml(valor: string): string {
    return valor
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/\n/g, '<br />');
}

export async function EnviarEmailContato(dados: ContatoDados): Promise<void> {
    const { nome, email, telefone, mensagem } = dados;

    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <body style="margin: 0; padding: 0; background-color: #f5f1ea; font-family: Arial, Helvetica, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f1ea; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
                <tr>
                  <td style="background-color: #3c2a1f; padding: 24px 32px;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 20px;">Nova mensagem pelo portfólio</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px; color: #333333; font-size: 14px; line-height: 1.6;">
                    <p style="margin: 0 0 20px;">Você recebeu uma nova mensagem através do formulário de contato:</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                      <tr>
                        <td style="padding: 6px 0; font-weight: bold; width: 110px; vertical-align: top;">Nome:</td>
                        <td style="padding: 6px 0;">${escapeHtml(nome)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-weight: bold; vertical-align: top;">E-mail:</td>
                        <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #3c2a1f;">${escapeHtml(email)}</a></td>
                      </tr>
                      ${telefone ? `
                      <tr>
                        <td style="padding: 6px 0; font-weight: bold; vertical-align: top;">Telefone:</td>
                        <td style="padding: 6px 0;">${escapeHtml(telefone)}</td>
                      </tr>` : ''}
                    </table>
                    <p style="margin: 20px 0 6px; font-weight: bold;">Mensagem:</p>
                    <blockquote style="margin: 0; padding: 16px 20px; background-color: #f9f6f0; border-left: 4px solid #3c2a1f; border-radius: 4px; color: #444444;">
                      ${escapeHtml(mensagem)}
                    </blockquote>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 32px; background-color: #f9f6f0; color: #888888; font-size: 12px;">
                    Enviado automaticamente pelo site kamyllefrazão.com.br
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;

    await getTransporter().sendMail({
        from: `"Site Kamylle Frazão" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `Novo contato pelo site - ${nome}`,
        html,
    });
}
