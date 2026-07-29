import { Adm } from '../types/adm';
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

const Adm = (connection.models.Adm as Model<Adm> | undefined) ?? (models.Adm as Model<Adm> | undefined) ?? model<Adm>('Adm', admSchema);

    export const AdmVerificacao = {
        VerificLogin: async (usuario: string, senha: string): Promise<boolean> => {
            const user = await Adm.findOne({ Nome: usuario }).lean().exec();
            if (user && user.Senha === senha) {
                await Adm.updateOne({ _id: user._id }, { Verificado: true });
                return true;
            } else {
                return false;
            }
        },

        logoutAll: async (): Promise<void> => {
            await Adm.updateMany({}, { Verificado: false });
        }
    }



export { Adm };
