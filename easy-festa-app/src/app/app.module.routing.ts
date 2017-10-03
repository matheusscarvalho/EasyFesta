import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders} from '@angular/core';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContaComponent } from './conta/conta.component';
import { FluxoCaixaComponent } from './fluxo-caixa/fluxo-caixa.component';

const APP_ROUTES:  Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'conta', component: ContaComponent},
    { path: 'fluxo-caixa', component: FluxoCaixaComponent},
    { path: 'anuncio', redirectTo: 'anuncio/listar' },
    { path: 'evento', redirectTo: 'evento/listar' },
    { path: 'agenda', redirectTo: 'agenda/visualizar' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
