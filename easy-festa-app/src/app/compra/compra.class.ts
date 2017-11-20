import { Pagamento } from './pagamento.class';
import { Contrato } from './../contrato/contrato.class';
export class Compra {
    _id: String;
    anuncio: String;
    consumidor: String;
    informacoes: String;
    informacoesEvento: String;
    quantidade: Number;
    contrato: Contrato;
    observacao: String;
    dataCompra: Date;
    fornecedor: String;
    pagamentos: Pagamento[] = [];
    dataEvento: Date;
    
    /*  
        1- Solicitada
        2- Aceita
        3- Não Aceita                       
        4- Desistida
        5- Paga 
    */
    status: Number;

    constructor() {
        this.contrato = new Contrato();
    }
}
