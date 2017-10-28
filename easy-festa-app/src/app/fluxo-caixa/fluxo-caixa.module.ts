//Módulos do Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Demais módulos
import { TabsModule } from 'ngx-bootstrap/tabs';

//Componentes da aplicação
import { FluxoCaixaComponent } from './fluxo-caixa.component';

@NgModule({
  declarations: [ FluxoCaixaComponent ],
  imports: [
    CommonModule,
    TabsModule.forRoot()
  ],
  exports: [ FluxoCaixaComponent ],
})
export class FluxoCaixaModule { }
