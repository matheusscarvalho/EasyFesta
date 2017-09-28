import { Component, OnInit } from '@angular/core';
import { AnuncioService } from './../anuncio.service';
import { Anuncio } from './../anuncio.class';

@Component({
  selector: 'cadastrar-anuncios',
  templateUrl: './cadastrar-anuncios.component.html',
  styleUrls: ['./cadastrar-anuncios.component.css']
})
export class CadastrarAnunciosComponent implements OnInit {

  novoAnuncio: Anuncio;
  constructor(private anuncioService: AnuncioService) { 
    this.novoAnuncio = new Anuncio();
    this.novoAnuncio.tipo = 1;
    this.novoAnuncio.publicado = true;
  }

  ngOnInit() {
  }

  adicionarAnuncio() {
    
    this.anuncioService.addAnuncio(this.novoAnuncio).subscribe(
      data => {
        // refresh the list
        console.log('Salvo com sucesso!')
      },
      error => {
        console.error("Erro ao salvar!");
      }
   );
    console.log();
  }

}
