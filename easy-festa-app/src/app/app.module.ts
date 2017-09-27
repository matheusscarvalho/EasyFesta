import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { CalendarioComponent } from './agenda/calendario/calendario.component';
import { AnuncioModule } from './anuncio/anuncio.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppComponent } from './app.component';
import { AgendaModule } from './agenda/agenda.module';

import { routing } from './app.module.routing';
import { HomeComponent } from './home/home.component';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './login/login.component';

import { AutenticacaoService } from './login/autenticacao/autenticacao.service';

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
    AgendaModule,
    CarouselModule.forRoot(),
    ChartsModule,
    routing
  ],
  providers: [AutenticacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
