import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { CalendarioComponent } from './calendario/calendario.component';
import { AgendaComponent } from './agenda.component';
import { CalendarComponent } from 'ap-angular2-fullcalendar/src/calendar/calendar';
import { AgendaRoutingModule } from './agenda.module.routing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgendaService } from './agenda.service';

@NgModule({
  imports: [
    CommonModule,
    AgendaRoutingModule,
    RouterModule,
    HttpModule,
    FormsModule,
    AngularFontAwesomeModule,
    ModalModule.forRoot()
    
  ],
  providers: [AgendaService],
  exports: [CalendarioComponent],
  declarations: [CalendarComponent, CalendarioComponent, AgendaComponent]
})
export class AgendaModule { }
