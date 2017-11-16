import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CadastrarAnunciosComponent } from './cadastrar-anuncios/cadastrar-anuncios.component';
import { ListarAnunciosComponent } from './listar-anuncios/listar-anuncios.component';
import { AnuncioComponent } from './anuncio.component';
import { AuthGuard } from './../guards/auth-guard';
import { ClassificarAnuncioComponent } from './classificar-anuncio/classificar-anuncio.component';
import { ConsumidorGuard } from './../guards/consumidor-guard';
import { FornecedorGuard } from './../guards/fornecedor-guard';

const AnuncioRoutes = [
    {path: 'anuncio',
        children: [
            {path: 'cadastrar', component: CadastrarAnunciosComponent,
                    canActivate: [AuthGuard, FornecedorGuard]},
            {path: 'listar', component: ListarAnunciosComponent,
                    canActivate: [AuthGuard]},
            {path: ':id/classificar', component: ClassificarAnuncioComponent,
                    canActivate: [AuthGuard, ConsumidorGuard]},
            {path: ':id/editar', component: CadastrarAnunciosComponent,
                    canActivate: [AuthGuard, FornecedorGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(AnuncioRoutes)],
    exports: [RouterModule]
})
export class AnuncioRoutingModule {}
