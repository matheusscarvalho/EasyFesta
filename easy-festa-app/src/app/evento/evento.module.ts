import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ListarEventosComponent } from './listar-eventos/listar-eventos.component';
import { CadastrarEventosComponent } from './cadastrar-eventos/cadastrar-eventos.component';
import { EventoComponent } from './evento.component';

import { EventoRoutingModule } from './evento.module.routing';
import { ModalModule } from 'ngx-bootstrap/modal';

import { EventoService } from './evento.service';
import { TextMaskModule } from 'angular2-text-mask';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    EventoRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    RouterModule,
    HttpModule,
    TextMaskModule,
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [EventoService],
  exports: [ListarEventosComponent, CadastrarEventosComponent, EventoComponent],
  declarations: [ListarEventosComponent, CadastrarEventosComponent, EventoComponent]
})
export class EventoModule { }
