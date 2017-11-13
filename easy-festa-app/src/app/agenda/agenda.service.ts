import { Agendamento } from './agendamento.class';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AgendaService {

  constructor(private http: Http) { }

  addAgendamento(agendamento: Agendamento) {

      agendamento.start = this.formatDataSalvar(agendamento.start.valueOf(), agendamento.time);
      let body = JSON.stringify(agendamento);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(`http://localhost:3000/api/agendamento`, body, options).map((res: Response) => res.json());
  }

  updateAgendamento(agendamento: Agendamento) {
      
      agendamento.start = this.formatDataSalvar(agendamento.start.valueOf(), agendamento.time);
      
      let body = JSON.stringify(agendamento);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(`http://localhost:3000/api/agendamento/editar`, body, options).map((res: Response) => res.json());
  }

  removeAgendamento(id: String) {
    let body = id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`http://localhost:3000/api/agendamento/`+body, options).map((res: Response) => res.json());
    
  }

  getAgendamentos(): Observable<Agendamento[]>{
          
          let idUsuario = localStorage.getItem('id'); 
          let options: Object = this.getHeaders();
          let agendamentos = this.http      
          .get(`http://localhost:3000/api/`+idUsuario+`/agendamentos`, options)
          .map((res:Response) => res.json());
          return agendamentos;
  }
    
  private getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  formatDataSalvar(data, horario) {
    console.log(data)
    let pedacosData = data.split("/");
    let pedacosHorario = horario.split(":");
    let novaData = new Date(pedacosData[2], (pedacosData[1] - 1), pedacosData[0], pedacosHorario[0], pedacosHorario[1],0,0);
    console.log(novaData)
    return novaData;

  }

}
