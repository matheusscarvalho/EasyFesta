//Módulos do Angular
import { Component, OnInit } from '@angular/core';

//Módulos da Aplicação
import { AnuncioService } from './../anuncio.service';
import { Anuncio } from './../anuncio.class';
import { Compra } from './../../compra/compra.class';
import { CompraService } from './../../compra/compra.service';

@Component({
  selector: 'listar-anuncios',
  templateUrl: './listar-anuncios.component.html',
  styleUrls: ['./listar-anuncios.component.css']
})
export class ListarAnunciosComponent implements OnInit {
  
  max: number = 5;
  rate: number = 1;
  isReadonly: boolean = true;
  segmentoPesquisa: Number = 0;
  mensagem = {
    texto: "",
    erro: false
  };
  compra: Compra = new Compra();

  pesquisa: String;
  anuncioVisualizado: Anuncio = new Anuncio();
  remocaoConfirmada: Boolean = false;
  idAnuncioRemover: String;
  indexAnuncioRemover: Number;
  tituloAnuncioRemover: String;
  tipoPerfil: String = localStorage.getItem('perfil');
  mostrarIconeCarregando: Boolean = true;
  anuncios: Anuncio[] = [];
  idConsumidor: String;
    /*
    0- Estado inicial
    1- Salvando
    2- Salva com sucesso
    3- Erro ao salvar
  */
  statusGravacaoCompra: Number = 0;
  

  //Auxilia na pesquisa
  anunciosAuxPesquisa: Anuncio[] = [];
  constructor(private anuncioService: AnuncioService, private compraService: CompraService) { }

  ngOnInit() {

    if(this.tipoPerfil == 'Consumidor') {
      this.idConsumidor = localStorage.getItem('id');
      this.anuncioService
      .getAnunciosConsumidor()
      .subscribe(
        a => {
  
          for(let i in a) {
            a[i].avaliacaoFinal = this.calcularAvaliacaoFinal(a[i]);
            a[i].aprovacao = this.calcularAprovacao(a[i]);
          }
  
          this.anuncios = a;
          this.anunciosAuxPesquisa = a;
  
      });
  
    }

    else {
      this.anuncioService
      .getAnunciosFornecedor()
      .subscribe(
        a => {
  
          for(let i in a) {
            a[i].avaliacaoFinal = this.calcularAvaliacaoFinal(a[i]);
            a[i].aprovacao = this.calcularAprovacao(a[i]);
          }
  
          this.anuncios = a;
          this.anunciosAuxPesquisa = a;
  
      });
  
    }

    
    setTimeout(()=>{   
      this.mostrarIconeCarregando = false;
    },1000);

    
  }

  confirmarRemocao(anuncio: Anuncio, index: Number) {
    this.idAnuncioRemover = anuncio._id;
    this.indexAnuncioRemover = index;
    this.tituloAnuncioRemover = anuncio.titulo;
  }

  prepararCompra(anuncio) {
    this.statusGravacaoCompra = 0;
    this.compra = new Compra();
    this.compra.anuncio = anuncio._id;
    this.compra.fornecedor = anuncio.fornecedor;
    this.compra.consumidor = this.idConsumidor;
  }

  salvarCompra() {
    this.statusGravacaoCompra = 1;
    this.compraService.addCompra(this.compra).subscribe(
      data => {
        this.statusGravacaoCompra = 2;
        console.log(data);
      },

      error=> {
        this.statusGravacaoCompra = 3;
        console.error(error);
      }
    )
  }

  removerAnuncio() {

    this.anuncioService.removeAnuncio(this.idAnuncioRemover).subscribe(
      data => {
        this.mensagem.erro = false;
        this.mensagem.texto = "O anúncio "+this.tituloAnuncioRemover+" foi removido com sucesso.";
        this.anuncios.splice(this.indexAnuncioRemover.valueOf(), 1);
      },
      error => {
        this.mensagem.erro = true;
        this.mensagem.texto = "Erro ao remover o anúncio "+this.tituloAnuncioRemover+".";
      }
    );

    this.remocaoConfirmada = true;
  }

  pesquisarAnuncio() {
    this.anuncios = this.anunciosAuxPesquisa.filter(
      (anuncio) => {

        //Entra se o campo de texto da pesquisa estiver preenchido
        if(this.pesquisa) {
          return (anuncio.descricao.toLocaleLowerCase().indexOf(this.pesquisa.valueOf().toLowerCase()) != -1 
                  || anuncio.titulo.toLocaleLowerCase().indexOf(this.pesquisa.valueOf().toLocaleLowerCase()) != -1)
              && (this.segmentoPesquisa == 0
                  || anuncio.segmento == this.segmentoPesquisa);
        }

        //Entra se o campo de texto da pesquisa estiver preenchido
        else {
          return this.segmentoPesquisa == 0
                || anuncio.segmento == this.segmentoPesquisa;
        }
        
      }
    );
  }

  limparVariaveisRemocao() {

    setTimeout(()=>{   
          this.remocaoConfirmada = false;
          this.idAnuncioRemover = null;
          this.indexAnuncioRemover = null;
          this.tituloAnuncioRemover = null;
          this.mensagem.texto = null;
    },1000);
    
  }

  calcularAvaliacaoFinal(anuncio: Anuncio) {

    let avalicaoFinal = this.anuncioService.calcularAvaliacãoFinal(anuncio);
    return avalicaoFinal;
  }

  calcularAprovacao(anuncio: Anuncio) {
    
    let aprovacao = this.anuncioService.calcularAprovacao(anuncio);
    return aprovacao;
  }

  visualizarAnuncio(indice) {
    this.anuncioVisualizado = this.anuncios[indice];
  }

}
