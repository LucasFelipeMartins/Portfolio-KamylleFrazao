export type Adm = {
    Nome: string,
    Senha: string,
    imgPrincipal: string,
    imgSecundaria: string,
    Verificado: boolean,
}

export type SafeAdm = Omit<Adm, 'Senha'>;