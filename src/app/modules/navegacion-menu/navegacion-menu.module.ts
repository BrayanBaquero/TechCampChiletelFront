import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NavegacionMenuRoutingModule } from './navegacion-menu-routing.module';
import { NavegacionMenuComponent } from './navegacion-menu.component';
;


@NgModule({
  declarations: [NavegacionMenuComponent],
  imports: [
    CommonModule,
    NavegacionMenuRoutingModule,
    MaterialModule

  ]
})
export class NavegacionMenuModule { }
