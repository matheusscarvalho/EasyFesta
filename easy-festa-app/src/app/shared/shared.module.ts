import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { MenuVerticalComponent } from './menu-vertical/menu-vertical.component';
import { MenuHorizontalComponent } from './menu-horizontal/menu-horizontal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFontAwesomeModule
  ],
  exports: [MenuVerticalComponent, MenuHorizontalComponent],
  declarations: [MenuVerticalComponent, MenuHorizontalComponent]
})
export class SharedModule { }
