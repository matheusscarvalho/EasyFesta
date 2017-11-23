//Módulos do Angular
import { Component, OnInit } from '@angular/core';

//Módulos da aplicação
import { AnuncioService } from './../anuncio/anuncio.service';
import { Anuncio } from './../anuncio/anuncio.class';
import { HomeService } from './home.service';
import { EventoService } from './../evento/evento.service';
import { Evento } from './../evento/evento.class';

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

  //Estatisticas de Eventos
  qtdEventosMes: Number = 0;
  qtdEventosRealizados: Number = 0;
  qtdEventosNRealizados: Number = 0;

  //Popularidade Fornecedor
  notaMediaFornecedor: Number = 0;
  aprovacaoFornecedor: Number = 0;

  mostrarFaturamento = false;
  dataCorrente = new Date();
  tipoPerfil = localStorage.getItem('perfil');
  idUsuario = localStorage.getItem('id');
  public barChartLabels: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public dados: any = {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0], label: 'Faturamento'};
  public barChartData: any[] = [
    this.dados
  ];

  eventos: Evento[] = [];
  constructor(private anuncioService:AnuncioService, private homeService: HomeService, private eventoService: EventoService) { }

  ngOnInit() {
    this.anuncioService
    .getAnunciosConsumidor()
    .subscribe(
      a => {
      this.anuncios = this.embaralhar(a);
    });

    if(this.tipoPerfil == 'Fornecedor') {
      this.anuncioService.getAnunciosFornecedor().subscribe(
        data=>{
          this.notaMediaFornecedor = this.anuncioService.calcularAvaliacãoFornecedor(data);
          this.aprovacaoFornecedor = this.anuncioService.calcularAprovacaoFornecedor(data);
        },

        error=>{
          console.error(error);
        }
      )
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
    
    );

  }
  else if(this.tipoPerfil == 'Consumidor') {
    this.eventoService.getEventos(this.idUsuario).subscribe(
      data=> {
        this.qtdEventosMes = data.length;
        if(this.qtdEventosMes) {
          data.filter(
            (evento)=>{
              evento.dataevento = new Date(evento.dataevento);
              if(evento.dataevento.getMonth() == this.dataCorrente.getMonth() && evento.dataevento.getDate() < this.dataCorrente.getDate()) {
                this.qtdEventosRealizados = this.qtdEventosRealizados.valueOf() + 1;                
              }
            }
          );
        }

        this.qtdEventosNRealizados = this.qtdEventosMes.valueOf() - this.qtdEventosRealizados.valueOf();
        //console.log(data);
      },

      error=> {
        console.error(error)
      }
    )
  }
  }

  embaralhar(vetor) {
      for (let i = vetor.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
      }

      return vetor;
  }


}
