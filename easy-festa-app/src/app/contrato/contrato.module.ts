//Componentes do Angular
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componentes da Aplicação
import { routing } from './../app.module.routing';
import { ContratoComponent } from './contrato/contrato.component';
import { ContratoService } from './contrato.service';

//Demais módulos
import { QuillEditorModule } from 'ngx-quill-editor';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuillEditorModule,
    AngularFontAwesomeModule,
    CollapseModule.forRoot(),
    ModalModule,
    routing
  ],
  exports: [ContratoComponent],
  providers: [ContratoService],
  declarations: [ContratoComponent]
})
export class ContratoModule { }
