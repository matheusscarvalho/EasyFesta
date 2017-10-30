//Módulos do Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//Demais módulos
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TextMaskModule } from 'angular2-text-mask';

//Componentes da aplicação
import { ContaComponent } from './conta.component';
import { CadastrarContasComponent } from './cadastrar-contas/cadastrar-contas.component';
import { ContaService } from './conta.service';

@NgModule({
  declarations: [ ContaComponent, CadastrarContasComponent ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TextMaskModule,
    AngularFontAwesomeModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot()  
  ],
  providers: [ContaService],
  exports: [ ContaComponent, CadastrarContasComponent]
  
})
export class ContaModule { }
