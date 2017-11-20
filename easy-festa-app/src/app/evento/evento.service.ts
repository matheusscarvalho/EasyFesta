import { Evento } from './evento.class';
import { Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EventoService {
  constructor (private http: Http) {}

  getEventos(idConsumidor): Observable<Evento[]> {
    const options: Object = this.getHeaders();
    const eventos = this.http.get('http://localhost:3000/api/'+idConsumidor+'/eventos', options).map((res: Response) => res.json());
    return eventos;
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  addEvento(evento: Evento) {
    const body = JSON.stringify(evento);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/api/evento', body, options).map((res: Response) => res.json());
  }

  removeEvento(id: Number) {
    const body = id.toString();
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.delete('http://localhost:3000/api/evento/' + body, options).map((res: Response) => res.json());

  }

  getEvento(evt_id: Number) {
    let body = evt_id.toString();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get('http://localhost:3000/api/evento/' + body, options).map((res: Response) => res.json());
  }

  editaEvento(evento: Evento) {
    let body = JSON.stringify(evento);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post('http://localhost:3000/api/evento/editar', body, options).
      map( (res: Response) => res.json() );

  }
}
