//Módulos do Angular
import { Component, OnInit } from '@angular/core';

//Módulos da aplicação
import { AnuncioService } from './../anuncio/anuncio.service';
import { Anuncio } from './../anuncio/anuncio.class';
import { HomeService } from './home.service';


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

  mostrarFaturamento = false;
  dataCorrente = new Date();
  tipoPerfil = localStorage.getItem('perfil');
  public barChartLabels: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public dados: any = {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0], label: 'Faturamento'};
  public barChartData: any[] = [
    this.dados
  ];

  constructor(private anuncioService:AnuncioService, private homeService: HomeService) { }

  ngOnInit() {
    this.anuncioService
    .getAnunciosConsumidor()
    .subscribe(
      a => {
      this.anuncios = this.embaralhar(a);
    });

    this.homeService.getFaturamento().subscribe(
      data=>{
        
        for(let faturamento of data) {
          
          if(faturamento._id.ano  == this.dataCorrente.getFullYear()) {
            this.dados.data[faturamento._id.mes - 1] = faturamento.faturamento;
          }
        }

        this.mostrarFaturamento = true;
        
      },

      error=>{
        console.error(error);
      }
    )


  }

  embaralhar(vetor) {
      for (let i = vetor.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
      }

      return vetor;
  }


}
