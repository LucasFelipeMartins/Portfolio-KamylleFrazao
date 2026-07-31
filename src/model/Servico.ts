import { Servico } from '../types/servico';
import { connection, model, Model, models, Schema } from 'mongoose';

const servicoSchema = new Schema<Servico>(
    {
        nome: { type: String, required: true },
        descricao: { type: String, required: true },
        icone: { type: String, required: true },
        ordem: { type: Number, required: true },
    }
);

const ServicoModel = (connection.models.Servico as Model<Servico> | undefined) ?? (models.Servico as Model<Servico> | undefined) ?? model<Servico>('Servico', servicoSchema);

export { ServicoModel as Servico };
