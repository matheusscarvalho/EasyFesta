import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Usuario } from './../usuario.class';

@Injectable()
export class AutenticacaoService {
  
  private autenticado: boolean = false;
  mostarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario) {

    if (usuario.nome === 'admin' && usuario.senha === '12345') {
        this.autenticado = true;
        this.router.navigate(['/']);
        this.mostarMenuEmitter.emit(true);

    } else {
      this.autenticado = false;
      this.mostarMenuEmitter.emit(false);
    }
    
  }

}
