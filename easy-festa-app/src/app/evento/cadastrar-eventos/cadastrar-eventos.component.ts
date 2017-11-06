import { Component, OnInit } from '@angular/core';
import { EventoService } from './../evento.service';
import { Evento } from './../evento.class';
import { Consumidor } from '../../conta/consumidor.class';

@Component({
  selector: 'cadastrar-eventos',
  templateUrl: './cadastrar-eventos.component.html',
  styleUrls: ['./cadastrar-eventos.component.css']
})
export class CadastrarEventosComponent implements OnInit {

  consumidor: Consumidor;
  novoEvento: Evento;
  constructor(private evtService: EventoService) {
    this.novoEvento = new Evento();
    this.novoEvento.tipo = "novo evento - consumidor";
    this.novoEvento.consumidor = new Consumidor();
  }

  ngOnInit() {}

  adicionarEvento() {

    this.evtService.addEvento(this.novoEvento).subscribe(
      data => {
        // refresh the list
        console.log('Seu evento foi salvo com sucesso!!');
      },
      error => {
        console.error('Erro ao criar evento!!');
      }
    );
  }

}
