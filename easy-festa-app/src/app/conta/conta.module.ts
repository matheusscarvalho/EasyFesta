//Módulos do Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Demais módulos
import { TabsModule } from 'ngx-bootstrap/tabs';

//Componentes da aplicação
import { ContaComponent } from './conta.component';

@NgModule({
  declarations: [ ContaComponent ],
  imports: [
    CommonModule,
    TabsModule.forRoot()   
  ],
  exports: [ ContaComponent ]
  
})
export class ContaModule { }
