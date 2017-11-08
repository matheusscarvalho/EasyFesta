//Módulos do Angular
import { Component, OnInit } from '@angular/core';

//Módulos da Aplicação
import { EventoService } from './../evento.service';
import { Evento } from './../evento.class';
import { Consumidor } from '../../conta/consumidor.class';
import { Produto } from './../produto.class';
import { Servico } from './../servico.class';

@Component({
  selector: 'cadastrar-eventos',
  templateUrl: './cadastrar-eventos.component.html',
  styleUrls: ['./cadastrar-eventos.component.css']
})
export class CadastrarEventosComponent implements OnInit {

  consumidor: Consumidor;
  novoEvento: Evento;
  novoProduto: Produto;
  produtoAdicionado: Boolean = false;
  novoServico: Servico;
  servicoAdicionado: Boolean = false;

  constructor(private evtService: EventoService) {
    this.novoEvento = new Evento();
    this.novoProduto = new Produto();
    this.novoServico = new Servico();
    this.novoEvento.tipo = "novo evento - consumidor";
    this.novoEvento.segmento = 1;
    this.novoEvento.consumidor = new Consumidor();
  }

  ngOnInit() {}

  adicionarEvento() {

    this.evtService.addEvento(this.novoEvento).subscribe(
      data => {
        // refresh the list
        console.log('Seu evento foi salvo com sucesso!!');
      },
      error => {
        console.error('Erro ao criar evento!!');
      }
    );
  }

  adicionarProduto() {
    this.novoEvento.produtos.push(this.novoProduto);
    this.resetarProduto();
    this.produtoAdicionado = true;
  }

  resetarProduto() {
    this.novoProduto = new Produto();
  }

  resetarStatusAdicaoProduto() {
    this.produtoAdicionado = false;
  }

  editarProduto(indice) {
    this.novoProduto = this.novoEvento.produtos[indice];
    
  }

  removerProduto(indice) {
    this.novoEvento.produtos.splice(indice, 1);
    this.resetarProduto();
  }

  adicionarServico() {
    this.novoEvento.servicos.push(this.novoServico);
    this.resetarServico();
    this.servicoAdicionado = true;
  }

  resetarServico() {
    this.novoServico = new Servico();
  }

  resetarStatusAdicaoServico() {
    this.servicoAdicionado = false;
  }

  editarServico(indice) {
    this.novoServico = this.novoEvento.servicos[indice];    
  }

  removerServico(indice) {
    this.novoEvento.servicos.splice(indice, 1);
    this.resetarServico();
  }

}
