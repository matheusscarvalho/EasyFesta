import { Consumidor } from "../conta/consumidor.class";
import { Produto } from "./produto.class";
import { Servico } from './servico.class';

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
  _id: String;
  dataevento: Date;
  hora: String;
  nome: String;
  tipo: String;
  desc: String;
  convidados: number;
  consumidor: String;
  produtos: Produto[] = [];
  servicos: Servico[] = [];

  /*  
      1- Aniversário
      2- Casamento
      3- Corporativo                       
      4- Debutante
      5- Formatura  
  */
  segmento: Number;
}
