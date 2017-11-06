import { Component, OnInit } from '@angular/core';

import { EventoService } from './../evento.service';
import { Evento } from './../evento.class';

@Component({
  selector: 'listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {
  eventos: Evento[] = [];
  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.eventoService.getEventos().subscribe(a => this.eventos = a);
  }

  plugAndPlay(id) {
    console.log('Editar evento: ');
    console.log(id);
  }

  removerEvento(id, index) {

    this.eventoService.removeEvento(id).subscribe(
      data => {
        this.eventos.splice(index, 1);
      },
      error => {
        console.error('Error saving event!');
      }
    );
  }

}
