import { Usuario } from './usuario.class';
import { Endereco } from './endereco.class';
export class Consumidor extends Usuario {

    nascimento: Date;
    cpf: String;
    senha: String;
    genero: String;

    constructor() {
        super();
        this.genero = "";
    }
}
