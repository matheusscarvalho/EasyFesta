import { Component } from '@angular/core';
import { AutenticacaoService } from './login/autenticacao/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mostrarMenu: boolean = false;

  constructor(private autenticacaoService: AutenticacaoService) {

  }

  ngOnInit() {
    this.autenticacaoService.mostarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
    
  }

}
