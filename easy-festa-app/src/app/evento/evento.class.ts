/*
>>>> Requisitos de informação

Ator: Consumidor

RINF4 Cadastral {
    Data: Date,
    Hora: Time,
    Nome: String,
    Tipo: String,
    Clientes: <Cliente>
    Lista de Convidados <Clientes>,
    Qtd Convidados: Integer
    Produtos/Serviços relacionados <Produto>
  }

 */
export class Evento {
  dataevento: Date;
  hora: String;
  nome: String;
  tipo: String;
  desc: String;
  convidados: number;
}
