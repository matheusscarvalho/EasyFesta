import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Usuario } from './../usuario.class';

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

    } else {
      this.autenticado = 'false';
      this.mostarMenuEmitter.emit(false);
      localStorage.setItem("logado", "nao");
    }
    
  }

  fazerLogout() {
    localStorage.setItem("logado", "nao");
    this.mostarMenuEmitter.emit(false);
  }

}
