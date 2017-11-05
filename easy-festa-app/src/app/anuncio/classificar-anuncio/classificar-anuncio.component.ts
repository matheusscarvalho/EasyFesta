//Módulos do Angular
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

//Módulos da Aplicação
import { AnuncioService } from './../anuncio.service';
import { Anuncio } from './../anuncio.class';

@Component({
  selector: 'app-classificar-anuncio',
  templateUrl: './classificar-anuncio.component.html',
  styleUrls: ['./classificar-anuncio.component.css']
})
export class ClassificarAnuncioComponent implements OnInit {
  max: number = 5;
  rate: number = 1;
  anuncioId : String;
  anuncioAvaliado: Anuncio;

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

}
