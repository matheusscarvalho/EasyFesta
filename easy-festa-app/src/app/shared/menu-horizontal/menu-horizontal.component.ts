import { AutenticacaoService } from './../../login/autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-horizontal',
  templateUrl: './menu-horizontal.component.html',
  styleUrls: ['./menu-horizontal.component.css']
})
export class MenuHorizontalComponent implements OnInit {
  usuario = localStorage.getItem('usuario');
  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
  }

  fazerLogout() {
    this.autenticacaoService.fazerLogout();
  }

}
