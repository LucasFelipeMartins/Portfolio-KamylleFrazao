import { Adm, SafeAdm } from '../types/adm';
import { connection, model, Model, models, Schema } from 'mongoose';
import { unlink } from 'fs/promises';
import path from 'path';

interface DadosSobreMim {
    sobreMimTitulo: string;
    sobreMimTexto: string;
}

interface NovasImagens {
    imgPrincipal?: string;
    imgSecundaria?: string;
    portfolioUrl?: string;
}

interface AdmModel extends Model<Adm> {
    GetDados(): Promise<Adm | null>;
    UpdateSobreMim(data: DadosSobreMim, novasImagens?: NovasImagens): Promise<boolean>;
}

async function deleteImageFile(urlImagem?: string) {
    if (!urlImagem) return;
    await unlink(path.join(__dirname, '../../public', urlImagem))
        .catch(err => console.error('Falha ao deletar imagem:', err));
}

const admSchema = new Schema<Adm, AdmModel>(
  {
    Nome: {
      type: String,
      required: true,
    },
    Senha: {
      type: String,
      required: true,
    },
    imgPrincipal: {
        type: String,
    },
    imgSecundaria: {
        type: String,
    },
    portfolioUrl: {
        type: String,
    },
    Verificado: {
        type: Boolean,
        default: false,
    },
    sobreMimTexto: {
        type: String,
    },
    sobreMimTitulo: {
        type: String,
    },
    estatisticas: {
        projetos: { type: Number },
        servicos: { type: Number },
        depoimentos: { type: Number },
        anosAtuacao: { type: Number },
    },
    servicos: [{ type: Schema.Types.ObjectId, ref: 'Servico' }],
    depoimentos: [{ type: Schema.Types.ObjectId, ref: 'Depoimento' }],
  },
  {
    statics: {
        GetDados() {
            return this.findOne().lean().exec();
        },
        async UpdateSobreMim(data: DadosSobreMim, novasImagens?: NovasImagens) {
            const adm = await this.findOne();
            if (!adm) return false;

            adm.sobreMimTitulo = data.sobreMimTitulo;
            adm.sobreMimTexto = data.sobreMimTexto;

            if (novasImagens?.imgPrincipal) {
                await deleteImageFile(adm.imgPrincipal);
                adm.imgPrincipal = novasImagens.imgPrincipal;
            }

            if (novasImagens?.imgSecundaria) {
                await deleteImageFile(adm.imgSecundaria);
                adm.imgSecundaria = novasImagens.imgSecundaria;
            }

            if (novasImagens?.portfolioUrl) {
                await deleteImageFile(adm.portfolioUrl);
                adm.portfolioUrl = novasImagens.portfolioUrl;
            }

            await adm.save();
            return true;
        },
    },
  },
);

const AdmModel = (connection.models.Adm as AdmModel | undefined) ?? (models.Adm as AdmModel | undefined) ?? model<Adm, AdmModel>('Adm', admSchema);

export const AdmVerificacao = {
    VerificLogin: async (usuario: string, senha: string): Promise<SafeAdm | null> => {
        const user = await AdmModel.findOne({ Nome: usuario }).lean().exec();
        if (user && user.Senha === senha) {
            // Remove sensitive data before returning
            const { Senha, ...userWithoutPassword } = user;
            return userWithoutPassword as SafeAdm;
        } else {
            return null;
        }
    }
}

export { AdmModel as Adm };
