import { Component, OnInit, ViewChild} from '@angular/core';
import { AgendaService } from './../agenda.service';
import { Observable } from 'rxjs/Observable';

import { Agendamento } from './../agendamento.class';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})

export class CalendarioComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('modalNovoAgendamento') parentModal: ModalDirective;

  tituloModal: String;
  iconeModal: String;
  agendamento: any;
  agendamentos: Agendamento[] = [];
  calendarOptions:any;
  public horarioMask = [/[0-1]/, /[0-9]/,':', /[0-5]/, /[0-9]/];  

  /*
    0- Estado inicial.
    1- Salvando.
    2- Salvo com sucesso.
    3- Erro ao salvar.
  */
  statusGravacao: Number = 0;

  /*
    0- Estado inicial.
    1- Excluindo.
    2- Excluído com sucesso.
    3- Erro ao excluir.
  */
  statusExclusao: Number = 0;
 
  constructor(private agendaService: AgendaService) { 
    this.agendamento = new Agendamento();
    this.agendamento.usuario = localStorage.getItem('id');
    
  }  

  ngOnInit() {
  
    this.agendaService
    .getAgendamentos()
    .subscribe(data => {
      let iterador;
      this.agendamentos = data;

      for (iterador in this.agendamentos) {
          this.agendamentos[iterador].start = this.formatDataDoMongo(this.formatData(new Date(this.agendamentos[iterador].start)), this.agendamentos[iterador].time);
      }     
      
      }
    );

    this.calendarOptions = {
      
      fixedWeekCount : true,
      locale: 'pt-br',
      buttonText: {
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia"
      },
      header: {
        left: 'prev, next, today',
        center: 'title',
        right: '',
      },
      editable: true,
      eventLimit: true,
      eventColor: "purple",
      eventBackgroundColor: "plum" 
    };    

    this.tituloModal = "Cadastrar Agendamento";
    this.iconeModal =  "plus-circle";   
  
  }

  loadEvents(ev) {
    let start = ev.view.start
    let end = ev.view.end
    
  }

  handleDayClick(clickEvent) {
    this.resetarAgendamento();
    var dataClicada = new Date(clickEvent.date._d);
    dataClicada.setDate(dataClicada.getDate() + 1);
    this.agendamento.start = this.formatData(dataClicada);
        
    this.parentModal.show();
  }

  formatData(data: Date) {
    return data.getDate() + '/' + (data.getMonth() + 1) + '/' +  data.getFullYear();
  }

  resetarAgendamento() {
    this.agendamento = new Agendamento();
    this.agendamento.usuario = localStorage.getItem('id');
    
  }

  formatDataDoMongo(data, horario) {
    
    let pedacosData = data.split("/");
    let pedacosHorario = horario.split(":");
    let novaData = new Date(pedacosData[2], (pedacosData[1] - 1), pedacosData[0], pedacosHorario[0], pedacosHorario[1],0,0);
 
    return novaData;

  }

  handleEventClick(clickEvent) {
    this.agendamento._id = clickEvent.calEvent._id;
    this.agendamento.kind = clickEvent.calEvent.kind;
    this.agendamento.title = clickEvent.calEvent.title;
    this.agendamento.start = this.formatData(new Date(clickEvent.calEvent.start));
    this.agendamento.time = clickEvent.calEvent.time;
    this.agendamento.description = clickEvent.calEvent.description;
    this.parentModal.show();
  }

    
  salvarAgendamento() {

    this.statusExclusao = 0;
    this.statusGravacao = 1;

    if(this.agendamento._id) {
      this.editarAgendamento();
    }
    else {
      this.adicionarAgendamento();
    }
  }

  resetarStatus() {
    this.statusExclusao = 0;
    this.statusGravacao = 0;
  }

  adicionarAgendamento() {
    this.agendamento.kind = 1;
    let ag = new Agendamento();

    ag._id = this.agendamento._id;
    ag.kind = this.agendamento.kind;
    ag.title = this.agendamento.title;
    ag.time = this.agendamento.time;
    ag.start = this.agendamento.start;
    ag.description = this.agendamento.description;
    ag.usuario = this.agendamento.usuario;

    this.agendaService.addAgendamento(ag).subscribe(
      data => {
        this.agendamentos.push(ag);              
        this.statusGravacao = 2;
      },
      error => {
        console.log(error);
        this.statusGravacao = 3;
       
      }
   );
  }

  editarAgendamento() {
    let ag = new Agendamento();
    
    ag._id = this.agendamento._id;
    ag.title = this.agendamento.title;
    ag.time = this.agendamento.time;
    ag.start = this.agendamento.start;
    ag.description = this.agendamento.description;
        
    this.agendaService.updateAgendamento(ag).subscribe(
      data => {
        
       this.agendamentos = this.agendamentos.filter((elemento)=> { 
          return this.agendamento._id != elemento._id; 
       });
        
        this.agendamentos.push(ag); 
        this.statusGravacao = 2;

      },
      error => {
        console.log(error);
        this.statusGravacao = 3;
      }
   );
  }

removerAgendamento() {
    this.statusGravacao = 0;
    this.statusExclusao = 1;

    this.agendaService.removeAgendamento(this.agendamento._id).subscribe(
      data => {
        
        this.agendamentos = this.agendamentos.filter((elemento)=> { 
          return this.agendamento._id != elemento._id; 
        });

        this.statusExclusao = 2;
        this.resetarAgendamento();
        
      },
      error => {
        console.log(error);
        this.statusExclusao = 3;
      }
   );
  } 

}
