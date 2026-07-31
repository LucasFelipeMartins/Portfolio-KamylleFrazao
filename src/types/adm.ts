export type Adm = {
    Nome: string,
    Senha: string,
    imgPrincipal: string,
    imgSecundaria: string,
    portfolioUrl?: string,
    Verificado: boolean,
    sobreMimTexto?: string;
    sobreMimTitulo?: string;
    estatisticas?: {
        projetos: number;
        servicos: number;
        depoimentos: number;
        anosAtuacao: number;
    };
    servicos?: string[];
    depoimentos?: string[];
}

export type SafeAdm = Omit<Adm, 'Senha'>;