import { Component, OnInit } from '@angular/core';
import { EventoService } from './../evento.service';
import { Evento } from './../evento.class';

@Component({
  selector: 'cadastrar-eventos',
  templateUrl: './cadastrar-eventos.component.html',
  styleUrls: ['./cadastrar-eventos.component.css']
})
export class CadastrarEventosComponent implements OnInit {

  novoEvento: Evento;
  constructor(private evtService: EventoService) {
    this.novoEvento = new Evento();
  }

  ngOnInit() {}

  adicionarEvento() {

    this.evtService.addEvento(this.novoEvento).subscribe(
      data => {
        // refresh the list
        console.log('Evento Salvo com sucesso!');
      },
      error => {
        console.error('Erro ao salvar evento!!');
      }
    );
  }

}
