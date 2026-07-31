import { Adm, SafeAdm } from '../types/adm';
import { connection, model, Model, models, Schema } from 'mongoose';

const admSchema = new Schema<Adm>(
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
    Verificado: {
        type: Boolean,
        default: false,
    },
  },
);

const AdmModel = (connection.models.Adm as Model<Adm> | undefined) ?? (models.Adm as Model<Adm> | undefined) ?? model<Adm>('Adm', admSchema);

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
