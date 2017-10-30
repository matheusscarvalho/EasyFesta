import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import { AutenticacaoService } from './login/autenticacao/autenticacao.service';
import { RotaAtualService } from './app.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mostrarMenu: boolean = localStorage.getItem('logado') == "sim";

  constructor(private rotaAtualService: RotaAtualService, private autenticacaoService: AutenticacaoService) {
    
  }

  ngOnInit() {

    this.autenticacaoService.mostarMenuEmitter.subscribe(
      mostrar=> {
        this.mostrarMenu = mostrar;
      }
    )    
    
  }

}
