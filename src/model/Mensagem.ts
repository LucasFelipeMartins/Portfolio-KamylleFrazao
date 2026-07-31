import { Mensagem } from '../types/mensagem';
import { connection, model, Model, models, Schema } from 'mongoose';

interface MensagemModel extends Model<Mensagem> {
    Create(data: Mensagem): Promise<Mensagem>;
    Count(): Promise<number>;
}

const mensagemSchema = new Schema<Mensagem, MensagemModel>(
    {
        nome: { type: String, required: true },
        email: { type: String, required: true },
        telefone: { type: String },
        mensagem: { type: String, required: true },
    },
    {
        timestamps: true,
        statics: {
            Create(data: Mensagem) {
                return this.create(data);
            },
            Count() {
                return this.countDocuments().exec();
            },
        },
    },
);

const MensagemModel = (connection.models.Mensagem as MensagemModel | undefined) ?? (models.Mensagem as MensagemModel | undefined) ?? model<Mensagem, MensagemModel>('Mensagem', mensagemSchema);

export { MensagemModel as Mensagem };
