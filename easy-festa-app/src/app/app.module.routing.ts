//Módulos Angular
import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders} from '@angular/core';

//Componentes da Aplicação
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContaComponent } from './conta/conta.component';
import { FluxoCaixaComponent } from './fluxo-caixa/fluxo-caixa.component';
import { ContratoComponent } from './contrato/contrato/contrato.component';
import { CadastrarContasComponent } from './conta/cadastrar-contas/cadastrar-contas.component';
import { ListarComprasComponent } from './compra/listar-compras/listar-compras.component';


const APP_ROUTES:  Routes = [
    { path: '', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'conta', component: ContaComponent},
    { path: 'conta/cadastrar', component: CadastrarContasComponent},
    { path: 'fluxo-caixa', component: FluxoCaixaComponent},
    { path: 'anuncio', redirectTo: 'anuncio/listar' },
    { path: 'contrato/:id', component: ContratoComponent },
    { path: 'compra/listar', component: ListarComprasComponent },
    { path: 'evento', redirectTo: 'evento/listar' },
    { path: 'agenda', redirectTo: 'agenda/visualizar' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
