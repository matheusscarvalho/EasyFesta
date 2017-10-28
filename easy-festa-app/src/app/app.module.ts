// Módulos do Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Módulos da aplicação
import { AgendaModule } from './agenda/agenda.module';
import { AnuncioModule } from './anuncio/anuncio.module';
import { EventoModule } from './evento/evento.module';
import { SharedModule } from './shared/shared.module';
import { ContaModule } from './conta/conta.module';
import { FluxoCaixaModule } from './fluxo-caixa/fluxo-caixa.module';

// Demais módulos
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ChartsModule } from 'ng2-charts';

// Componentes da aplicação
import { CalendarioComponent } from './agenda/calendario/calendario.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

// Serviços da aplicação
import { AutenticacaoService } from './login/autenticacao/autenticacao.service';
import { RotaAtualService } from './app.service';

// Rotas
import { routing } from './app.module.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    AnuncioModule,
    RouterModule,
    EventoModule,
    AgendaModule,
    CarouselModule.forRoot(),
    ChartsModule,
    ContaModule,
    FluxoCaixaModule,
    routing
  ],
  providers: [RotaAtualService],
  bootstrap: [AppComponent]
})
export class AppModule { }
