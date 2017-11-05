import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RatingModule } from 'ngx-bootstrap/rating';

import { ListarAnunciosComponent } from './listar-anuncios/listar-anuncios.component';
import { CadastrarAnunciosComponent } from './cadastrar-anuncios/cadastrar-anuncios.component';
import { AnuncioComponent } from './anuncio.component';

import { AnuncioRoutingModule } from './anuncio.module.routing';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AnuncioService } from './anuncio.service';
import { ClassificarAnuncioComponent } from './classificar-anuncio/classificar-anuncio.component';
import { VisualizarAnuncioComponent } from './visualizar-anuncio/visualizar-anuncio.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    AnuncioRoutingModule,
    RouterModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    RatingModule.forRoot()
  ],
  providers: [AnuncioService],
  exports: [ListarAnunciosComponent, CadastrarAnunciosComponent, AnuncioComponent, ClassificarAnuncioComponent],
  declarations: [ListarAnunciosComponent, CadastrarAnunciosComponent, AnuncioComponent, ClassificarAnuncioComponent, VisualizarAnuncioComponent]
})
export class AnuncioModule { }
