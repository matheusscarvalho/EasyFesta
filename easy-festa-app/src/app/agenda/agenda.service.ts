import { Agendamento } from './agendamento.class';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AgendaService {

  constructor(private http: Http) { }

  addAgendamento(agendamento: Agendamento) {
   
      let body = JSON.stringify(agendamento);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(`http://localhost:3000/api/agendamento`, body, options).map((res: Response) => res.json());
  }

  getAgendamentos(): Observable<Agendamento[]>{
    
          let options: Object = this.getHeaders();
          let agendamentos = this.http      
          .get(`http://localhost:3000/api/agendamentos`, options)
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

}
