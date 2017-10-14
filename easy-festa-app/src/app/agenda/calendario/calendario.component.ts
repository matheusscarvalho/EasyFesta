import { Component, OnInit } from '@angular/core';
import { AgendaService } from './../agenda.service';
import { Observable } from 'rxjs/Observable';

import { Agendamento } from './../agendamento.class';

@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})

export class CalendarioComponent implements OnInit {

  tituloModal: String;
  iconeModal: String;
  agendamento: Agendamento;
  agendamentos: Agendamento[] = [];
  calendarOptions:Object = {};
 
  constructor(private agendaService: AgendaService) { 
    this.agendamento = new Agendamento();
    
  }

  ngOnInit() {
    this.agendaService
    .getAgendamentos()
    .subscribe(data => {
      this.agendamentos = data;
      }
    );
    
    this.agendamento.title = "teste";
    this.agendamento.date = new Date();
    this.tituloModal = "Cadastrar Agendamento";
    this.iconeModal =  "plus-circle"; 
    
    this.calendarOptions = {
      fixedWeekCount : true,
      locale: 'pt-br',
      eventClick: this.abrirModalEdicao(),
      buttonText: {
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia"
      },
      header: {
        left: 'prev,next, today',
        center: 'title',
        right: '',
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: {
        url: 'http://localhost:3000/api/agendamentos',
        color: 'purple',   // an option!
        textColor: 'white' // an option!
    }
    };
  
  }

    
  abrirModalEdicao() {
    
    //document.getElementById("botaoAbrirModal").click();
    
  }

  adicionarAgendamento() {
    
    this.agendaService.addAgendamento(this.agendamento).subscribe(
      data => {
        this.agendamentos.push(this.agendamento);
        console.log(this.agendamento)

      },
      error => {
        alert(2)
       
      }
   );
  }

  

}
