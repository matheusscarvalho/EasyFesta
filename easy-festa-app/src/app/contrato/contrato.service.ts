//Módulos do Angular
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//Módulos da Aplicação
import { Contrato } from './contrato.class';


@Injectable()
export class ContratoService {

  constructor (private http: Http) {}

  addContrato(contrato: Contrato) {
      let body = JSON.stringify(contrato);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(`http://localhost:3000/api/contrato`, body, options).map((res: Response) => res.json());
  }

  private getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  
  getContrato(id) {
    
    let body = id.toString();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`http://localhost:3000/api/contrato/`+body, options).map((res: Response) => res.json());
    
  }

  updateContrato(contrato: Contrato) {
    let body = JSON.stringify(contrato);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`http://localhost:3000/api/contrato/editar`, body, options).map((res: Response) => res.json());
  }

  removerContrato(id) {
    let body = id.toString();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`http://localhost:3000/api/contrato/`+body, options).map((res: Response) => res.json());
        
  }

}