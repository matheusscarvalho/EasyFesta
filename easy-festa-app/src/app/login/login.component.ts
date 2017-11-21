//Componentes Angular
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

//Componentes da Aplicação
import { AutenticacaoService } from './autenticacao/autenticacao.service';
import { Consumidor } from './../conta/consumidor.class';
import { Fornecedor } from './../conta/fornecedor.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  //private usuario;
  private usuario;
  private stausLogin: Boolean = false;

  constructor(private route: ActivatedRoute, private autenticacaoService: AutenticacaoService) { 
    
  }

  ngOnInit() {
    this.autenticacaoService.mostraMensagemLogin.subscribe(
      status=>{
        this.stausLogin = status;

      } 
    )
  }

  fazerLogin() {
    this.autenticacaoService.fazerLogin(this.usuario);   
  }

  instanciarConsumidor() {
    this.usuario = new Consumidor();
  }

  instanciarFornecedor() {
    this.usuario = new Fornecedor();
  }

  resetarPerfil() {
    this.usuario = null;
  }

  getUsuario(){
    return this.usuario;
  }

  getStausLogin(){
    return this.stausLogin;
  }

}
