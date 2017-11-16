import { AutenticacaoService } from './../login/autenticacao/autenticacao.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router'

@Injectable()
export class AuthGuard implements CanActivate {

  logado: Boolean = localStorage.getItem('id') == ''?  false: true;
  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }

  canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot

  ): Observable<boolean> | boolean{
     
    if(this.logado) {
      return true;
    }

    this.router.navigate(['/login'])

    return false;
  }

}
