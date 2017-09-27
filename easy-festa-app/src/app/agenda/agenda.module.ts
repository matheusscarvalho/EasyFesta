import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { CalendarioComponent } from './calendario/calendario.component';
import { AgendaComponent } from './agenda.component';
import { CalendarComponent } from 'ap-angular2-fullcalendar/src/calendar/calendar';
import { AgendaRoutingModule } from './agenda.module.routing';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    CommonModule,
    AgendaRoutingModule,
    AngularFontAwesomeModule,
    ModalModule.forRoot()
    
  ],
  exports: [CalendarioComponent],
  declarations: [CalendarComponent, CalendarioComponent, AgendaComponent]
})
export class AgendaModule { }
