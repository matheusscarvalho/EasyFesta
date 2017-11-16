//Módulos do Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Módulos da Aplicação
import { EventoService } from './../evento.service';
import { Evento } from './../evento.class';
import { Consumidor } from '../../conta/consumidor.class';
import { Produto } from './../produto.class';
import { Servico } from './../servico.class';
import { AnuncioService } from './../../anuncio/anuncio.service';
import { Anuncio } from './../../anuncio/anuncio.class';
import { AgendaService } from './../../agenda/agenda.service';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { ptBr } from 'ngx-bootstrap/locale';
defineLocale('ptBr', ptBr);

@Component({
  selector: 'cadastrar-eventos',
  templateUrl: './cadastrar-eventos.component.html',
  styleUrls: ['./cadastrar-eventos.component.css']
})
export class CadastrarEventosComponent implements OnInit {

  bsConfig = Object.assign({}, { locale: 'ptBr' });
  consumidor: Consumidor;
  operacao: String;
  novoEvento: Evento;
  novoProduto: Produto;
  produtoAdicionado: Boolean = false;
  novoServico: Servico;
  servicoAdicionado: Boolean = false;
  public horarioMask = [/[0-1]/, /[0-9]/,':', /[0-5]/, /[0-9]/];  
  paginaAtual: String;
  anunciosSugeridos: Anuncio[] = [];
  anuncios: Anuncio[] = [];

  constructor(private evtService: EventoService,private agendaService: AgendaService, private router: ActivatedRoute, private anuncioService: AnuncioService) {
    this.novoEvento = new Evento();
    this.novoProduto = new Produto();
    this.novoServico = new Servico();
    this.novoEvento.tipo = "novo evento - consumidor";
    this.novoEvento.segmento = 1;
    this.novoEvento.consumidor = localStorage.getItem('id');
  }

  ngOnInit() {
    const idEvento = this.router.snapshot.params['id'];
    
    if(idEvento) {
      this.paginaAtual = "editar";
      this.evtService.getEvento(idEvento).subscribe(
        data => {
          this.novoEvento = data;
          this.novoEvento.dataevento = new Date();
        },
        error => {
          console.error(error);
        }
      );
      
    } else {
      this.paginaAtual = "cadastrar";
      this.novoEvento.segmento = null;
    }

    this.anuncioService.getAnunciosConsumidor().subscribe(
      data=> {
        this.anuncios = data;
        if(idEvento) {
          this.anunciosSugeridos = this.filtrarAnuncios();
        }

        else {
          this.anunciosSugeridos = this.anuncios;
        }
      }
    );
  }

  filtrarAnuncios() {
    let novoVetAnucios: Anuncio[];

    novoVetAnucios = this.anuncios.filter(
      (anuncio)=> {
        return anuncio.segmento == this.novoEvento.segmento || anuncio.segmento == 6;
      }
    );

    if(!novoVetAnucios.length) {
      novoVetAnucios = this.anuncios;
    }

    return novoVetAnucios;    
  }

  salvarEvento() {
    if(this.novoEvento._id) {
      this.editarEvento();
    }

    else {
      this.adicionarEvento();
    }
      
    
  }

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

  editarEvento() {
    
    this.evtService.editaEvento(this.novoEvento).subscribe(
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
    this.operacao = "Adicionar";
    this.novoEvento.produtos.push(this.novoProduto);
    this.resetarProduto();
    this.produtoAdicionado = true;
    this.calcularValorEvento();
  }

  resetarProduto() {
    this.novoProduto = new Produto();
  }

  resetarStatusAdicaoProduto() {
    this.produtoAdicionado = false;
  }

  editarProduto(indice) {
    this.operacao = "Editar";
    this.novoProduto = this.novoEvento.produtos[indice];
    this.calcularValorEvento();
  }

  removerProduto(indice) {
    this.novoEvento.produtos.splice(indice, 1);
    this.resetarProduto();
    this.calcularValorEvento();
  }

  adicionarServico() {
    this.operacao = "Adicionar";
    this.novoEvento.servicos.push(this.novoServico);
    this.resetarServico();
    this.servicoAdicionado = true;
    this.calcularValorEvento();
  }

  resetarServico() {
    this.novoServico = new Servico();
  }

  resetarStatusAdicaoServico() {
    this.servicoAdicionado = false;
  }

  editarServico(indice) {
    this.operacao = "Editar";
    this.novoServico = this.novoEvento.servicos[indice];  
    this.calcularValorEvento();  
  }

  removerServico(indice) {
    this.novoEvento.servicos.splice(indice, 1);
    this.resetarServico();
    this.calcularValorEvento();
  }

  calcularValorEvento() {
    
    let total = this.calcularTotalProdutos() + this.calcularTotalServicos();
   
    return total;
  }

  calcularTotalProdutos() {
    let total = 0;    
    if(this.novoEvento.produtos.length) {
      for(let produto of this.novoEvento.produtos) {
        total = total + produto.preco.valueOf() * produto.quantidade.valueOf();
      }
    }
    
    return total;
  }

  calcularTotalServicos() {
    let total = 0;    
    if(this.novoEvento.servicos.length) {
      for(let servico of this.novoEvento.servicos) {
        total = total + servico.preco.valueOf();
      }
    }
    
    return total;
  }

}
