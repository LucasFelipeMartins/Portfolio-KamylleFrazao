import { Projeto, tipoDeprojeto } from '../types/projeto';
import { connection, model, Model, models, Schema } from 'mongoose';

interface ProjetosModel extends Model<Projeto> {
    
    GetAll(): Promise<Projeto[]>;
    GetTypes(tipoDeProjeto: tipoDeprojeto): Promise<Projeto[]>;

}

const projetoSchema = new Schema<Projeto, ProjetosModel>(
  {

    nome: {
      type: String,
      required: true,
    },

    tipoDeProjeto: {
      type: String,
      required: true,
      enum: ['residencial', 'interiores', 'comercial'],
    },

    endereco: {
        cidade: {
        type: String,
        required: true,
      },   
      estado: {
        type: String,
        required: true,
      },
    },

    descricao: {
      type: String,
      required: true,
    },

    urlImagem: {
      type: String,
      required: true,
    },
  },

  {
    statics: {

      GetAll() {
        return this.find().lean().exec();
      },
      GetTypes(tipoDeProjeto: tipoDeprojeto) {
        return this.find({ tipoDeProjeto }).lean().exec();
      },

    },
  },
);

const Projetos =
  (connection.models.Projetos as ProjetosModel | undefined) ?? (models.Projetos as ProjetosModel | undefined) ?? model<Projeto, ProjetosModel>('Projetos', projetoSchema);

export { Projetos };
