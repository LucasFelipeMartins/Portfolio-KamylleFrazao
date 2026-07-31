import { Depoimento } from '../types/depoimento';
import { connection, model, Model, models, Schema } from 'mongoose';

const depoimentoSchema = new Schema<Depoimento>(
    {
        nomeCliente: { type: String, required: true },
        projeto: { type: String, required: true },
        texto: { type: String, required: true },
        ordem: { type: Number, required: true },
        avatar: { type: String, required: true },
    }
);

const DepoimentoModel = (connection.models.Depoimento as Model<Depoimento> | undefined) ?? (models.Depoimento as Model<Depoimento> | undefined) ?? model<Depoimento>('Depoimento', depoimentoSchema);

export { DepoimentoModel as Depoimento };
