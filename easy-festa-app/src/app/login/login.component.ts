import { Component, OnInit } from '@angular/core';

import { AutenticacaoService } from './autenticacao/autenticacao.service';
import { Usuario } from './usuario.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private usuario: Usuario;

  constructor(private autenticacaoService: AutenticacaoService) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  fazerLogin() {
    this.autenticacaoService.fazerLogin(this.usuario);
  }


}
