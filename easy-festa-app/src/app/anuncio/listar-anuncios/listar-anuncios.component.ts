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
  remocaoConfirmada: Boolean = false;
  idAnuncioRemover: String;
  indexAnuncioRemover: Number;
  tituloAnuncioRemover: String;
  mostrarIconeCarregando: Boolean = true;
  anuncios: Anuncio[] = [];
  constructor(private anuncioService: AnuncioService) { }

  ngOnInit() {
    this.anuncioService
    .getAnuncios()
    .subscribe(a => this.anuncios = a);

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

  limparVariaveisRemocao() {

    setTimeout(()=>{   
          this.remocaoConfirmada = false;
          this.idAnuncioRemover = null;
          this.indexAnuncioRemover = null;
          this.tituloAnuncioRemover = null;
          this.mensagem.texto = null;
    },1000);
    
  }

}
