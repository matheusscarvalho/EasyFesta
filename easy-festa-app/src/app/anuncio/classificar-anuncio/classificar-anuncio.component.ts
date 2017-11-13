//Módulos do Angular
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

//Módulos da Aplicação
import { AnuncioService } from './../anuncio.service';
import { Anuncio } from './../anuncio.class';
import { Avaliacao } from './../avaliacao.class';

@Component({
  selector: 'app-classificar-anuncio',
  templateUrl: './classificar-anuncio.component.html',
  styleUrls: ['./classificar-anuncio.component.css']
})
export class ClassificarAnuncioComponent implements OnInit {
  max: number = 5;
  avaliacao: Avaliacao = new Avaliacao();
  anuncioId : String;
  anuncioAvaliado: Anuncio;
  tipoPerfil: String = localStorage.getItem('perfil');

  /*
    1- Salvando.
    2- Salvo com sucesso.
    3- Erro ao salvar.
  */
  statusGravacao: Number = 1;

  constructor(private route: ActivatedRoute, private anuncioService: AnuncioService) { }

  ngOnInit() {

    //Obtem anúncio avaliado
    this.anuncioId = this.route.snapshot.params['id'];       
  
    if(this.anuncioId) {
      this.anuncioService.getAnuncio(this.anuncioId).subscribe(
        a => {
          this.anuncioAvaliado = a;
        } 
      );
    }
    
  }

  salvarAvaliacao() {
    
    this.anuncioAvaliado.avaliacoes.push(this.avaliacao);
    this.anuncioService.updateAnuncio(this.anuncioAvaliado).subscribe(
      //Sucesso ao salvar
      data=> {
        this.statusGravacao = 2;
      },

      //Insucesso ao salvar
      error=> {
        this.statusGravacao = 2;
        console.error(error);
      }
    )
  }
}
