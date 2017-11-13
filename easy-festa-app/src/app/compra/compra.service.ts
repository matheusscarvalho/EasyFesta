import { Compra } from './compra.class';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class CompraService {

  constructor (private http: Http) {}

  getComprasConsumidor(id): Observable<Compra[]>{

      let options: Object = this.getHeaders();
      let compras = this.http      
      .get(`http://localhost:3000/api/consumidor/`+id+`/compras`, options)
      .map((res:Response) => res.json());
      return compras;
  }

  getComorasFonecedor(id): Observable<Compra[]>{
    
          let options: Object = this.getHeaders();
          let compras = this.http      
          .get(`http://localhost:3000/api/fornecedor/`+id+`/compras`, options)
          .map((res:Response) => res.json());
          return compras;
      }

  addCompra(compra: Compra) {
      let body = JSON.stringify(compra);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(`http://localhost:3000/api/compra`, body, options).map((res: Response) => res.json());
  }

    updateCompra(compra: Compra) {
        let body = JSON.stringify(compra);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`http://localhost:3000/api/compra/editar`, body, options).map((res: Response) => res.json());
    }


    getCompra(id) {
    let body = id.toString();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`http://localhost:3000/api/compra/`+body, options).map((res: Response) => res.json());

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