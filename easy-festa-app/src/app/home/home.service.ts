//Módulos do Angular
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
  
  constructor(private router: Router, private http: Http) { }

  getFaturamento(){
    
    let options: Object = this.getHeaders();
    let idFornecedor = localStorage.getItem("id");
    let faturamento = this.http      
    .get(`http://localhost:3000/api/fluxo/de/caixa/`+idFornecedor, options)
    .map((res:Response) => res.json());
    return faturamento;
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