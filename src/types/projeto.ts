export type tipoDeprojeto = 'residencial' | 'interiores' | 'comercial';
export type TipoDeProjeto = tipoDeprojeto;

export interface Projeto {
  nome: string;
  tipoDeProjeto: TipoDeProjeto;
  endereco: {
    cidade: string;
    estado: string;
  };
  descricao: string;
  urlImagem: string;
}
