import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ListarEventosComponent } from './listar-eventos/listar-eventos.component';
import { CadastrarEventosComponent } from './cadastrar-eventos/cadastrar-eventos.component';
import { EditarEventoComponent } from './editar/editar-evento.component';
import { EventoComponent } from './evento.component';

import { EventoRoutingModule } from './evento.module.routing';
import { ModalModule } from 'ngx-bootstrap/modal';

import { EventoService } from './evento.service';

@NgModule({
  imports: [
    CommonModule,
    EventoRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    RouterModule,
    HttpModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [EventoService],
  exports: [ListarEventosComponent, CadastrarEventosComponent, EditarEventoComponent, EventoComponent],
  declarations: [ListarEventosComponent, CadastrarEventosComponent, EditarEventoComponent, EventoComponent]
})
export class EventoModule { }
