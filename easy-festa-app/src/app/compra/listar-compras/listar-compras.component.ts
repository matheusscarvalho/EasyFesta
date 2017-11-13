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

@Component({
  selector: 'app-listar-compras',
  templateUrl: './listar-compras.component.html',
  styleUrls: ['./listar-compras.component.css']
})
export class ListarComprasComponent implements OnInit {

  pesquisa: String;
  dataInicioPesquisa: Date;
  dataFimPesquisa: Date;
  compras: Compra[] = [];
  compra: Compra = new Compra();
  tipoPerfil = localStorage.getItem('perfil');
  anuncio: Anuncio = new Anuncio();
  fornecedor: Fornecedor =  new Fornecedor();
  consumidor: Consumidor = new Consumidor();

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

  prepararContaParaManupulicao(compra) {
    this.compra = compra;
    this.obterAnuncio(compra.anuncio);

    if(this.tipoPerfil == 'Consumidor') {
      this.ObterFornecedor(compra.fornecedor);
    }

    else {
      this.ObterConsumidor(compra.consumidor);
    }
    
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

  salvarCompra() {
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
        this.consumidor = data.consumidor;       
      },

      error=> {
        console.error(error);
      }
    )
  }

  

}
