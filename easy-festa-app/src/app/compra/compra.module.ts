//Módulos do Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Módulos da Aplicação
import { CompraService } from './compra.service';
import { ListarComprasComponent } from './listar-compras/listar-compras.component';
import { routing } from './../app.module.routing';

//Demais módulos
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    FormsModule, 
    routing,
    ModalModule
  ],
  exports: [ListarComprasComponent],
  providers: [CompraService],
  declarations: [ListarComprasComponent]
})
export class CompraModule { }
