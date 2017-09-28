import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders} from '@angular/core';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const APP_ROUTES:  Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'anuncio', redirectTo: 'anuncio/listar' },
    { path: 'agenda', redirectTo: 'agenda/visualizar' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);