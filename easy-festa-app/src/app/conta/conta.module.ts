//Módulos do Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Demais módulos
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';

//Componentes da aplicação
import { ContaComponent } from './conta.component';
import { CadastrarContasComponent } from './cadastrar-contas/cadastrar-contas.component';

@NgModule({
  declarations: [ ContaComponent, CadastrarContasComponent ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule.forRoot(),
    TabsModule.forRoot()  
  ],
  exports: [ ContaComponent, CadastrarContasComponent]
  
})
export class ContaModule { }
