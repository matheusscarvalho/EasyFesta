import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnuncioService } from './../anuncio.service';
import { Anuncio } from './../anuncio.class';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'cadastrar-anuncios',
  templateUrl: './cadastrar-anuncios.component.html',
  styleUrls: ['./cadastrar-anuncios.component.css']
})
export class CadastrarAnunciosComponent implements OnInit {

  idAnuncioEditar: Number;
  mensagem;
  eRotaCadastro: Boolean;
  rotaDeCadastro: String = "cadastrar";
  anuncio: Anuncio;

  constructor(private anuncioService: AnuncioService, private route: ActivatedRoute) {
      this.anuncio = new Anuncio();
   }

  ngOnInit() {
    this.mensagem = {texto: "", erro: false};

    //Verifica se a rota atual é a de cadastro
    this.eRotaCadastro = this.route.snapshot.url[0].toString() == this.rotaDeCadastro;

    //Entra se a rota atual for de cadastro
    if(this.eRotaCadastro) {      
      this.anuncio.tipo = 1;
      this.anuncio.publicado = true;
      this.anuncio.fornecedor = localStorage.getItem("id");

    //Entra se a rota atual for a de edição
    } else {
      const id = this.route.snapshot.params['id'];
      this.anuncioService.getAnuncio(id).subscribe(
        a => {
          this.anuncio = a;
          console.log(this.anuncio)
        } 
      );

    }
    

  }

  salvarAnuncio() {
    //Entra se a rota atual for de cadastro
    if(this.eRotaCadastro) {      
      this.adicionarAnuncio();

    //Entra se a rota atual for a de edição
    } else {
      this.editarAnuncio();
    }
  }

  adicionarAnuncio() {
    
    this.anuncioService.addAnuncio(this.anuncio).subscribe(
      data => {
        this.mensagem.texto = "Anúncio "+this.anuncio.titulo+" salvo com sucesso.";
        this.mensagem.erro = false;
      },
      error => {
        this.mensagem.texto = "Erro ao salvar o anúncio "+this.anuncio.titulo+".";
        this.mensagem.erro = true;
       
      }
   );
  }

  editarAnuncio() {
    
    this.anuncioService.updateAnuncio(this.anuncio).subscribe(
      data => {
        this.mensagem.texto = "Anúncio "+this.anuncio.titulo+" editado com sucesso."
        this.mensagem.erro = false;
      },
      error => {
        //this.mensagem.texto = "Erro ao editar o anúncio "+this.anuncio.titulo+".";
        //this.mensagem.erro = true;
        this.mensagem.texto = "Anúncio "+this.anuncio.titulo+" editado com sucesso."
        this.mensagem.erro = false;
      }
   );
  }

}
