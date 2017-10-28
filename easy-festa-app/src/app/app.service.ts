import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class RotaAtualService {
  
  private autenticado: boolean = false;
  mostarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: ActivatedRoute) { }

  getRotaAtual() {
    return this.router.snapshot.url.join("/");
  }

}
