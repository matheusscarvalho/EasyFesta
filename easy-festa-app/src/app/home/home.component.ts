//Módulos do Angular
import { Component, OnInit } from '@angular/core';

//Módulos da aplicação
import { AnuncioService } from './../anuncio/anuncio.service';
import { Anuncio } from './../anuncio/anuncio.class';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  anuncios: Anuncio[] = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  constructor(private anuncioService:AnuncioService) { }

  ngOnInit() {
    this.anuncioService
    .getAnuncios()
    .subscribe(
      a => {
      this.anuncios = this.embaralhar(a);
    });
  }

embaralhar(vetor) {
    for (let i = vetor.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
    }

    return vetor;
}

}
