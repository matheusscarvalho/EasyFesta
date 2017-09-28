import { Component, OnInit } from '@angular/core';

import { AnuncioService } from './../anuncio.service';
import { Anuncio } from './../anuncio.class';

@Component({
  selector: 'listar-anuncios',
  templateUrl: './listar-anuncios.component.html',
  styleUrls: ['./listar-anuncios.component.css']
})
export class ListarAnunciosComponent implements OnInit {

  anuncios: Anuncio[] = [];
  constructor(private anuncioService: AnuncioService) { }

  ngOnInit() {
    this.anuncioService
    .getAnuncios()
    .subscribe(a => this.anuncios = a);
  }

  removerAnuncio(id, index) {
    
    this.anuncioService.removeAnuncio(id).subscribe(
      data => {
        this.anuncios.splice(index, 1);
      },
      error => {
        console.error("Error saving food!");
      }
    );
  }

}
