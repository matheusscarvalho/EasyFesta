import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CalendarioComponent } from './calendario/calendario.component';
import { AgendaComponent } from './agenda.component';
import { AuthGuard } from './../guards/auth-guard';

const AgendamentoRoutes = [
    {path: 'agenda', component: AgendaComponent,
    canActivate: [AuthGuard],
        children: [
            {path: 'visualizar', component: CalendarioComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(AgendamentoRoutes)],
    exports: [RouterModule]
})
export class AgendaRoutingModule {}