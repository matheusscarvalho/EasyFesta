import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { CalendarioComponent } from './calendario/calendario.component';
import { AgendaComponent } from './agenda.component';
import { AgendaRoutingModule } from './agenda.module.routing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgendaService } from './agenda.service';
import { TextMaskModule } from 'angular2-text-mask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {ScheduleModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    AgendaRoutingModule,
    RouterModule,
    ScheduleModule,
    HttpModule,
    BsDatepickerModule.forRoot(),
    TextMaskModule,
    FormsModule,
    AngularFontAwesomeModule,
    ModalModule.forRoot()
    
  ],
  providers: [AgendaService],
  exports: [CalendarioComponent],
  declarations: [CalendarioComponent, AgendaComponent]
})
export class AgendaModule { }
