import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CadastrarAnunciosComponent } from './cadastrar-anuncios/cadastrar-anuncios.component';
import { ListarAnunciosComponent } from './listar-anuncios/listar-anuncios.component';
import { AnuncioComponent } from './anuncio.component';

const AnuncioRoutes = [
    {path: 'anuncio', 
        children: [
            {path: 'cadastrar', component: CadastrarAnunciosComponent},
            {path: 'listar', component: ListarAnunciosComponent},
            {path: ':id/editar', component: CadastrarAnunciosComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(AnuncioRoutes)],
    exports: [RouterModule]
})
export class AnuncioRoutingModule {}