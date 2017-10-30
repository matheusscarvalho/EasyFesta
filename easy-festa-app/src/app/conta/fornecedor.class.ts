import { Usuario } from './usuario.class';
import { Endereco } from './endereco.class';
export class Fornecedor extends Usuario{    
    
    tipoPessoa: String;
    responsavel: String;
    generoResponsavel: String;
    cpf: String;
    cnpj: String;
    razaoSocial: String;
    descricao: Text;
    servicosProdutos: String;

    constructor() {
        super();
        this.generoResponsavel = "";
        this.tipoPessoa = "F";
    }

}
