import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    console.log(this.route.snapshot)
  }

  fazerLogin() {
    //this.autenticacaoService.fazerLogin(this.usuario);
  }


}
