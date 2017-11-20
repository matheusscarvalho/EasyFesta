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
  eventosAuxPesquisa: Evento[] = [];
  dataAtual: Date =  new Date();
  dataInicioPesquisa: Date = new Date();
  dataFimPesquisa: Date;
  pesquisa: String;
  idConsumidor: String = localStorage.getItem("id");

  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.eventoService.getEventos(this.idConsumidor).subscribe(
      a => {
        a = this.ordenarEventosPorData(a);
        this.eventos = a;
         this.eventosAuxPesquisa = a;
      } 
    );
  }

  ordenarEventosPorData(eventos: Evento[]) {
    eventos = eventos.sort(
      (evento1, evento2 ) => {
        return evento2.dataevento < evento1.dataevento ? -1 : evento2.dataevento > evento1.dataevento ? 1 : 0;
      }
    );

    return eventos;
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

  pesquisarAnuncio() {
    this.eventos = this.eventosAuxPesquisa.filter(
      (evento) => {

        return evento.nome.toLocaleLowerCase().indexOf(this.pesquisa.valueOf().toLowerCase()) != -1 || evento.desc.toLocaleLowerCase().indexOf(this.pesquisa.valueOf().toLocaleLowerCase()) != -1;
      }
    );
  }

}
