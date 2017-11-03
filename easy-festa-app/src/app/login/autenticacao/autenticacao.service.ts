//Módulos do Angular
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

//Módulos da Aplicação
import { Usuario } from './../../conta/usuario.class';

@Injectable()
export class AutenticacaoService {
  
  autenticado: String = localStorage.getItem('logado');
  mostarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario) {

    if (usuario) {
        this.autenticado = 'true';
        this.mostarMenuEmitter.emit(true);
        this.router.navigate(['/home']);  
        localStorage.setItem("logado", "sim");     
        localStorage.setItem("perfil", usuario.constructor.name);  

    } else {
      this.autenticado = 'false';
      this.mostarMenuEmitter.emit(false);
      localStorage.setItem("logado", "nao");
    }
    
  }

  fazerLogout() {
    localStorage.setItem("logado", "nao");
    localStorage.setItem("perfil", ""); 
    this.mostarMenuEmitter.emit(false);
    this.router.navigate(['/login']); 
  }

}
