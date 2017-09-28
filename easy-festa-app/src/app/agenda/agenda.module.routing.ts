import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CalendarioComponent } from './calendario/calendario.component';
import { AgendaComponent } from './agenda.component';

const AnuncioRoutes = [
    {path: 'agenda', component: AgendaComponent, 
        children: [
            {path: 'visualizar', component: CalendarioComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(AnuncioRoutes)],
    exports: [RouterModule]
})
export class AgendaRoutingModule {}