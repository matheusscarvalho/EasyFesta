//Módulos do Angular
import { Component, OnInit, Input } from '@angular/core';

//Módulos da Aplicação
import { Anuncio } from './../anuncio.class';

@Component({
  selector: 'visualizar-anuncio',
  templateUrl: './visualizar-anuncio.component.html',
  styleUrls: ['./visualizar-anuncio.component.css']
})
export class VisualizarAnuncioComponent implements OnInit {
  @Input('anuncio') anuncio: Anuncio;

  max = 5;
  constructor() {

  }

  ngOnInit() {
  }

}
