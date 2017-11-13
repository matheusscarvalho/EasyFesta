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
    
    /*  
        1- Solicitada
        2- Aceita
        3- Não Aceita                       
        4- Desistida
        5- Finalizada (entrega e prestação de serviços realizadas)  
    */
    status: Number;

    constructor() {
        this.contrato = new Contrato();
    }
}
