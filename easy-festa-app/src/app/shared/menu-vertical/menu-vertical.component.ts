import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-vertical',
  templateUrl: './menu-vertical.component.html',
  styleUrls: ['./menu-vertical.component.css']
})
export class MenuVerticalComponent implements OnInit {

  /*
    1- Consumidor
    2- Fornecedor
  */
  tipoPerfil: Number = localStorage.getItem("perfil") == "Consumidor" ? 1: 2;
  
  constructor() { }

  ngOnInit() {
  }

}
