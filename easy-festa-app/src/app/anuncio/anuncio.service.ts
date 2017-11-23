import { Anuncio } from './anuncio.class';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AnuncioService {

  constructor (private http: Http) {}

  getAnunciosConsumidor(): Observable<Anuncio[]>{

      let options: Object = this.getHeaders();
      let anuncios = this.http      
      .get(`http://localhost:3000/api/anuncios`, options)
      .map((res:Response) => res.json());
      return anuncios;
  }

  getAnunciosFornecedor(): Observable<Anuncio[]>{
    
          let options: Object = this.getHeaders();
          let idFornecedor = localStorage.getItem("id");
          let anuncios = this.http      
          .get(`http://localhost:3000/api/`+idFornecedor+`/anuncios`, options)
          .map((res:Response) => res.json());
          return anuncios;
      }

  addAnuncio(anuncio: Anuncio) {
      let body = JSON.stringify(anuncio);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(`http://localhost:3000/api/anuncio`, body, options).map((res: Response) => res.json());
  }

  updateAnuncio(anuncio: Anuncio) {
    let body = JSON.stringify(anuncio);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`http://localhost:3000/api/anuncio/editar`, body, options).map((res: Response) => res.json());
}

  removeAnuncio(id: String) {
    let body = id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`http://localhost:3000/api/anuncio/`+body, options).map((res: Response) => res.json());
    
  }

  getAnuncio(id) {
    let body = id.toString();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`http://localhost:3000/api/anuncio/`+body, options).map((res: Response) => res.json());
    
  }

  private getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  //Retorna nota média das avaliações do anúncio
  calcularAvaliacãoFinal(anuncio: Anuncio) {
    let notas = 0;
    var notaFinal = 0;

    for(let i in anuncio.avaliacoes) {
      notas += anuncio.avaliacoes[i].nota.valueOf();
    }

    if(notas) {
      notaFinal = notas/anuncio.avaliacoes.length;
      
    }
    
    return Math.trunc(notaFinal);
  }

  calcularAvaliacãoFornecedor(anuncios: Anuncio[]) {
    let notas = 0;
    var notaFinal = 0;
    let qtdNotas = 0;

    for(let anuncio of anuncios) {
      for(let i in anuncio.avaliacoes) {
        notas += anuncio.avaliacoes[i].nota.valueOf();
      }
      qtdNotas = qtdNotas + anuncio.avaliacoes.length;
    }

    if(notas) {
      notaFinal = notas/qtdNotas;      
    }
    
    
    return Math.trunc(notaFinal);
  }

  //Retrona a porcentagem de consumidores que comprariam o produto/serviço novamente
  calcularAprovacao(anuncio: Anuncio) {
    let qtdCompraria = 0;
    let porcentagemCompraria = 0;
    
    for(let i in anuncio.avaliacoes) {
      qtdCompraria = anuncio.avaliacoes[i].novaCompra.valueOf() == true ? qtdCompraria + 1 : qtdCompraria;
    }

    if(qtdCompraria) {
      porcentagemCompraria = (qtdCompraria*100/anuncio.avaliacoes.length);
    }

    return Math.trunc(porcentagemCompraria);
  }

  calcularAprovacaoFornecedor(anuncios: Anuncio[]) {
    let qtdCompraria = 0;
    let porcentagemCompraria = 0;
    let qtdAvaliacoes = 0;
    
    for(let anuncio of anuncios) {
      for(let i in anuncio.avaliacoes) {
        qtdCompraria = anuncio.avaliacoes[i].novaCompra.valueOf() == true ? qtdCompraria + 1 : qtdCompraria;
        qtdAvaliacoes = qtdAvaliacoes + 1;
      }
      
    }
    
    if(qtdAvaliacoes) {
      porcentagemCompraria = (qtdCompraria*100/qtdAvaliacoes);
    }

    return Math.trunc(porcentagemCompraria);
  }

  

}