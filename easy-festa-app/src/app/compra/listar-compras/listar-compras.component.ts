//Módulos do Angular
import { Component, OnInit } from '@angular/core';

//Módulos da Aplicação
import { CompraService } from './../compra.service';
import { Compra } from './../compra.class';
import { AnuncioService } from './../../anuncio/anuncio.service';
import { Anuncio } from './../../anuncio/anuncio.class';
import { Fornecedor } from './../../conta/fornecedor.class';
import { ContaService } from './../../conta/conta.service';
import { Consumidor } from './../../conta/consumidor.class';
import { Pagamento } from './../pagamento.class';

@Component({
  selector: 'app-listar-compras',
  templateUrl: './listar-compras.component.html',
  styleUrls: ['./listar-compras.component.css']
})
export class ListarComprasComponent implements OnInit {

  pesquisa: String;
  dataInicioPesquisa: Date;
  dataFimPesquisa: Date;
  compraDesistir: Compra = new Compra();
  compras: Compra[] = [];
  compra: Compra = new Compra();
  tipoPerfil = localStorage.getItem('perfil');
  anuncio: Anuncio = new Anuncio();
  fornecedor: Fornecedor =  new Fornecedor();
  consumidor: Consumidor = new Consumidor();
  novoPagamento: Pagamento = new Pagamento();

  constructor(private compraService: CompraService, private anuncioService: AnuncioService, private contaService: ContaService) { }

  ngOnInit() {

    if(this.tipoPerfil == 'Consumidor') {
      let idConsumidor = localStorage.getItem('id');
      this.compraService.getComprasConsumidor(idConsumidor).subscribe(
        data=> {
          this.compras = data;
        },

        error=> {
          console.error(error);
        }
      );
    } else {
      let idFornecedor = localStorage.getItem('id');
      this.compraService.getComorasFonecedor(idFornecedor).subscribe(
        data=> {
          this.compras = data;
        },

        error=> {
          console.error(error);
        }
      );
    }
  }

  prepararDesistencia(compra) {
    this.compraDesistir = compra;
  }

  desistirCompra() {
    this.compraDesistir.status = 4;
    this.compraService.updateCompra(this.compraDesistir).subscribe(
      data=> {
        console.log(data);
      },

      error=> {
        console.error(error);
      }
    )
  }

  prepararContaParaManupulicao(compraManipulada) {
    this.compra = compraManipulada;
    this.obterAnuncio(compraManipulada.anuncio);

    if(this.tipoPerfil == 'Consumidor') {
      this.ObterFornecedor(compraManipulada.fornecedor);
    }

    else {
      this.ObterConsumidor(compraManipulada.consumidor);
    }
    
  }

  prepararPagamento(compra) {
    this.compra = compra;
  }

  getTotalPago() {
    let total = 0;
    
    for(let pagamento of this.compra.pagamentos) {
        total += pagamento.valor.valueOf(); 
    }

    return total;
  }

  resetarCompra() {
    this.compra = new Compra();
    this.fornecedor = new Fornecedor();
    this.consumidor = new Consumidor();
  }

  adicionarPagamento() {
    let valorRestante = this.compra.contrato.valor.valueOf() - this.getTotalPago();

    if(this.novoPagamento.valor > valorRestante) {
      this.novoPagamento.valor = valorRestante;
    }
    
    if(this.novoPagamento.valor > 0) {
      this.novoPagamento.data = new Date();
      this.compra.pagamentos.push(this.novoPagamento);
    }
   
    this.novoPagamento = new Pagamento();
  }

  obterAnuncio(id) {
    
    this.anuncioService.getAnuncio(id).subscribe(
      data=> {
        this.anuncio = data;        
      },

      error=> {
        console.error(error);
      }
    )

    
  }

  rejeiarCompra() {
    this.compra.status = 3;
    this.salvarCompra();
    
  }

  verificaStatusPagamento() {
    let valorRestante = this.compra.contrato.valor.valueOf() - this.getTotalPago();
    
    if(valorRestante == 0) {
      this.compra.status = 5;
    } else {
      this.compra.status = 2;
    }
  }

  salvarCompra() {
       
    if(this.compra.contrato) {
      this.verificaStatusPagamento();
    } 
    
    this.compraService.updateCompra(this.compra).subscribe(
      data=> {
        console.log(data);
      },

      error=> {
        console.error(error);
      }
    )
  }

  ObterFornecedor(id) {
    this.contaService.getFornecedor(id).subscribe(
      data=> {
        this.fornecedor = data.fornecedor;       
      },

      error=> {
        console.error(error);
      }
    )
  }

  ObterConsumidor(id) {
    this.contaService.getConsumidor(id).subscribe(
      data=> {
        console.log(data)
        this.consumidor = data.consumidor;       
      },

      error=> {
        console.error(error);
      }
    )
  }

  

}
