import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CadastrarEventosComponent } from './cadastrar-eventos/cadastrar-eventos.component';
import { ListarEventosComponent } from './listar-eventos/listar-eventos.component';
import {EditarEventoComponent} from "./editar/editar-evento.component";
import { EventoComponent } from './evento.component';

const EventoRoutes = [
  {path: 'evento',
    children: [
      {path: 'cadastrar', component: CadastrarEventosComponent},
      {path: 'listar', component: ListarEventosComponent},
      {path: ':id/editar', component: EditarEventoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(EventoRoutes)],
  exports: [RouterModule]
})
export class EventoRoutingModule {}
