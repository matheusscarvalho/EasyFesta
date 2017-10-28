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
  /*mostrarMenu: boolean = false;
  rotaLogin: String = "login";
  rotaContas: String = "conta";*/

  constructor(private rotaAtualService: RotaAtualService) {
    console.log(this.rotaAtualService.getRotaAtual())
  }

  ngOnInit() {
    //Verifica se a rota atual é a de Login ou Contas
   // this.mostrarMenu = this.route.snapshot.url[0].toString() == this.rotaLogin;
    //this.mostrarMenu = this.route.snapshot.url[0].toString() == this.rotaContas;
    
    
  }

}
