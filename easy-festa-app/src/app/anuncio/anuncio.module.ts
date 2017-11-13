//Módulos do Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

//Módulos da Aplicação
import { ListarAnunciosComponent } from './listar-anuncios/listar-anuncios.component';
import { CadastrarAnunciosComponent } from './cadastrar-anuncios/cadastrar-anuncios.component';
import { AnuncioComponent } from './anuncio.component';
import { CompraModule } from './../compra/compra.module';
import { AnuncioRoutingModule } from './anuncio.module.routing';
import { AnuncioService } from './anuncio.service';
import { ClassificarAnuncioComponent } from './classificar-anuncio/classificar-anuncio.component';
import { VisualizarAnuncioComponent } from './visualizar-anuncio/visualizar-anuncio.component';

//Demais Módulos
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    AnuncioRoutingModule,
    RouterModule,
    FormsModule,
    HttpModule,
    CompraModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    RatingModule.forRoot()
  ],
  providers: [AnuncioService],
  exports: [ListarAnunciosComponent, CadastrarAnunciosComponent, AnuncioComponent, ClassificarAnuncioComponent],
  declarations: [ListarAnunciosComponent, CadastrarAnunciosComponent, AnuncioComponent, ClassificarAnuncioComponent, VisualizarAnuncioComponent]
})
export class AnuncioModule { }
