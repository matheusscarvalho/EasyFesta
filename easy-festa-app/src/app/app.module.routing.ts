import { FornecedorGuard } from './guards/fornecedor-guard';
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
import { AuthGuard } from './guards/auth-guard';


const APP_ROUTES:  Routes = [
    { path: '', component: LoginComponent},
    { path: 'home', component: HomeComponent,
            canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'conta', component: ContaComponent,
            canActivate: [AuthGuard]},
    { path: 'conta/cadastrar', component: CadastrarContasComponent},
    { path: 'fluxo-caixa', component: FluxoCaixaComponent,
            canActivate: [AuthGuard, FornecedorGuard]},
    { path: 'anuncio', redirectTo: 'anuncio/listar'},
    { path: 'contrato/:id', component: ContratoComponent,
            canActivate: [AuthGuard] },
    { path: 'compra/listar', component: ListarComprasComponent,
            canActivate: [AuthGuard] },
    { path: 'evento', redirectTo: 'evento/listar'},
    { path: 'agenda', redirectTo: 'agenda/visualizar'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
