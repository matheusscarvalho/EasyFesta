export class Contrato {    
    _id: String;
    texto: String;
    dataCriacao: Date;

    /*
        1- Criado ou Alterado pelo fornecedor
        2- Aceito pelo consumidor.
        3- Contrato não aceito pelo consumidor.
        4- Solicitação de exclusão realizada pelo fornecedor.
        5- Solicitação de exclusão realizada pelo consumidor.
      
    */
    status: Number;
    valor: Number;
}
