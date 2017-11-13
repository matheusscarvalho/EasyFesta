//Módulos do Angular
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

//Módulos da Aplicação
import { Usuario } from './../../conta/usuario.class';
import { UsuarioLogin } from './../usuario.class';

@Injectable()
export class AutenticacaoService {
  
  autenticado: String = localStorage.getItem('logado');
  mostarMenuEmitter = new EventEmitter<boolean>();
  mostraMensagemLogin = new EventEmitter<boolean>();

  constructor(private router: Router, private http: Http) { }

  fazerLogin(usuario: Usuario) {
    
    if(usuario) {
      this.conferirDados(usuario); 
    } else {
      localStorage.setItem("logado", "");
      localStorage.setItem("perfil", ""); 
      localStorage.setItem("nome", "");
      localStorage.setItem("id", "");  
      this.mostarMenuEmitter.emit(false);
      this.mostraMensagemLogin.emit(true);
    }    
  }

  conferirDados(usu: Usuario) {

    this.mostraMensagemLogin.emit(false);

    let usuario: UsuarioLogin = new UsuarioLogin();
    usuario.email = usu.email;
    usuario.senha = usu.senha;
    usuario.perfil = usu.constructor.name;  
     

    let body = JSON.stringify(usuario);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
  
    this.http.post(`http://localhost:3000/api/login/provisorio`, body, options).map((res: Response) => res.json())
    .subscribe(
      data=> {

        if(data.msg) {
          this.autenticado = 'true';
          this.mostarMenuEmitter.emit(true);           
          localStorage.setItem("logado", "sim");     
          localStorage.setItem("perfil", usuario.perfil.valueOf()); 
          localStorage.setItem("id", data.msg._id);
          localStorage.setItem("nome", data.msg.nome);
          this.router.navigate(['/home']);                   
        } else {
          this.mostraMensagemLogin.emit(true);
        }
        
      },

      error=> {
        console.error(error);
      }
    );  
    
  }

  fazerLogout() {
    localStorage.setItem("logado", "");
    localStorage.setItem("perfil", ""); 
    localStorage.setItem("nome", "");
    localStorage.setItem("id", "");  
    this.mostarMenuEmitter.emit(false);
    this.mostraMensagemLogin.emit(false);
    this.router.navigate(['/login']); 
  }
}