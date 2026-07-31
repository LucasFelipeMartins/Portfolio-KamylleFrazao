import { Projeto, tipoDeprojeto } from '../types/projeto';
import { connection, model, Model, models, Schema } from 'mongoose';
import { unlink } from 'fs/promises';
import path from 'path';

interface DadosProjeto {
  nome: string;
  tipoDeProjeto: tipoDeprojeto;
  endereco: {
    cidade: string;
    estado: string;
  };
  descricao: string;
  urlImagem?: string;
}

interface ProjetosModel extends Model<Projeto> {

    GetAll(): Promise<Projeto[]>;
    GetTypes(tipoDeProjeto: tipoDeprojeto): Promise<Projeto[]>;
    Create(data: DadosProjeto): Promise<Projeto>;
    GetById(id: string): Promise<Projeto | null>;
    UpdateById(id: string, data: DadosProjeto, novaUrlImagem?: string): Promise<void>;
    DeleteById(id: string): Promise<void>;

}

async function deleteImageFile(urlImagem?: string) {
    if (!urlImagem) return;
    await unlink(path.join(__dirname, '../../public', urlImagem))
        .catch(err => console.error('Falha ao deletar imagem:', err));
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
      Create(data: DadosProjeto) {
        return this.create(data);
      },
      GetById(id: string) {
        return this.findById(id).lean().exec();
      },
      async UpdateById(id: string, data: DadosProjeto, novaUrlImagem?: string) {
        const projeto = await this.findById(id);
        if (!projeto) return;

        if (novaUrlImagem) {
            await deleteImageFile(projeto.urlImagem);
            data.urlImagem = novaUrlImagem;
        }

        await this.findByIdAndUpdate(id, data);
      },
      async DeleteById(id: string) {
        const projeto = await this.findById(id);
        if (!projeto) return;

        await deleteImageFile(projeto.urlImagem);
        await this.findByIdAndDelete(id);
      },

    },
  },
);

const Projetos =
  (connection.models.Projetos as ProjetosModel | undefined) ?? (models.Projetos as ProjetosModel | undefined) ?? model<Projeto, ProjetosModel>('Projetos', projetoSchema);

export { Projetos };
