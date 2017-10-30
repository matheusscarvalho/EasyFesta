import { Endereco } from './endereco.class';
export class Usuario {    
    _id: String;
    nome: String;
    email: String;
    senha: String;
    telefone: String;
    endereco: Endereco;

    constructor() {
        this.endereco = new Endereco();
    }

}
