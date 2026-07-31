import { Depoimento } from '../types/depoimento';
import { connection, model, Model, models, Schema } from 'mongoose';

interface DepoimentoModel extends Model<Depoimento> {
    Create(data: Depoimento): Promise<Depoimento>;
    GetAll(): Promise<Depoimento[]>;
    GetById(id: string): Promise<Depoimento | null>;
    UpdateById(id: string, data: Depoimento): Promise<void>;
    DeleteById(id: string): Promise<void>;
}

const depoimentoSchema = new Schema<Depoimento, DepoimentoModel>(
    {
        nomeCliente: { type: String, required: true },
        projeto: { type: String, required: true },
        texto: { type: String, required: true },
        ordem: { type: Number, required: true },
        avatar: { type: String, required: true },
    },
    {
        statics: {
            Create(data: Depoimento) {
                return this.create(data);
            },
            GetAll() {
                return this.find().sort({ ordem: 'asc' }).lean().exec();
            },
            GetById(id: string) {
                return this.findById(id).lean().exec();
            },
            async UpdateById(id: string, data: Depoimento) {
                await this.findByIdAndUpdate(id, data);
            },
            async DeleteById(id: string) {
                await this.findByIdAndDelete(id);
            },
        },
    },
);

const DepoimentoModel = (connection.models.Depoimento as DepoimentoModel | undefined) ?? (models.Depoimento as DepoimentoModel | undefined) ?? model<Depoimento, DepoimentoModel>('Depoimento', depoimentoSchema);

export { DepoimentoModel as Depoimento };
