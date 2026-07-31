import { Servico } from '../types/servico';
import { connection, model, Model, models, Schema } from 'mongoose';

interface ServicoModel extends Model<Servico> {
    Create(data: Servico): Promise<Servico>;
    GetAll(): Promise<Servico[]>;
    GetById(id: string): Promise<Servico | null>;
    UpdateById(id: string, data: Servico): Promise<void>;
    DeleteById(id: string): Promise<void>;
}

const servicoSchema = new Schema<Servico, ServicoModel>(
    {
        nome: { type: String, required: true },
        descricao: { type: String, required: true },
        icone: { type: String, required: true },
        ordem: { type: Number, required: true },
    },
    {
        statics: {
            Create(data: Servico) {
                return this.create(data);
            },
            GetAll() {
                return this.find().sort({ ordem: 'asc' }).lean().exec();
            },
            GetById(id: string) {
                return this.findById(id).lean().exec();
            },
            async UpdateById(id: string, data: Servico) {
                await this.findByIdAndUpdate(id, data);
            },
            async DeleteById(id: string) {
                await this.findByIdAndDelete(id);
            },
        },
    },
);

const ServicoModel = (connection.models.Servico as ServicoModel | undefined) ?? (models.Servico as ServicoModel | undefined) ?? model<Servico, ServicoModel>('Servico', servicoSchema);

export { ServicoModel as Servico };
