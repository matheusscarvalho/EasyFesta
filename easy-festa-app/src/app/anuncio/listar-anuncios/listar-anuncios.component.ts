import { Component, OnInit } from '@angular/core';

import { AnuncioService } from './../anuncio.service';
import { Anuncio } from './../anuncio.class';

@Component({
  selector: 'listar-anuncios',
  templateUrl: './listar-anuncios.component.html',
  styleUrls: ['./listar-anuncios.component.css']
})
export class ListarAnunciosComponent implements OnInit {
  
  max: number = 5;
  rate: number = 1;
  isReadonly: boolean = true;
  mensagem = {
    texto: "",
    erro: false
  };

  pesquisa: String;
  anuncioVisualizado: Anuncio = new Anuncio();
  remocaoConfirmada: Boolean = false;
  idAnuncioRemover: String;
  indexAnuncioRemover: Number;
  tituloAnuncioRemover: String;
  mostrarIconeCarregando: Boolean = true;
  anuncios: Anuncio[] = [];

  //Auxilia na pesquisa
  anunciosAuxPesquisa: Anuncio[] = [];
  constructor(private anuncioService: AnuncioService) { }

  ngOnInit() {
    this.anuncioService
    .getAnuncios()
    .subscribe(
      a => {

        for(let i in a) {
          a[i].avaliacaoFinal = this.calcularAvaliacaoFinal(a[i]);
          a[i].aprovacao = this.calcularAprovacao(a[i]);
        }

        this.anuncios = a;
        this.anunciosAuxPesquisa = a;

    });

    setTimeout(()=>{   
      this.mostrarIconeCarregando = false;
    },1000);

    
  }

  confirmarRemocao(anuncio: Anuncio, index: Number) {
    this.idAnuncioRemover = anuncio._id;
    this.indexAnuncioRemover = index;
    this.tituloAnuncioRemover = anuncio.titulo;
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

        return anuncio.descricao.toLocaleLowerCase().indexOf(this.pesquisa.valueOf().toLowerCase()) != -1 || anuncio.titulo.toLocaleLowerCase().indexOf(this.pesquisa.valueOf().toLocaleLowerCase()) != -1;
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
