import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CadastrarEventosComponent } from './cadastrar-eventos/cadastrar-eventos.component';
import { ListarEventosComponent } from './listar-eventos/listar-eventos.component';
import { EventoComponent } from './evento.component';
import { AuthGuard } from './../guards/auth-guard';
import { ConsumidorGuard } from './../guards/consumidor-guard';

const EventoRoutes = [
  {path: 'evento',
  canActivate: [AuthGuard, ConsumidorGuard],
    children: [
      {path: 'cadastrar', component: CadastrarEventosComponent},
      {path: 'listar', component: ListarEventosComponent},
      {path: ':id/editar', component: CadastrarEventosComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(EventoRoutes)],
  exports: [RouterModule]
})
export class EventoRoutingModule {}
