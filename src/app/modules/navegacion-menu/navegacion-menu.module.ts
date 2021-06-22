import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NavegacionMenuRoutingModule } from './navegacion-menu-routing.module';
import { NavegacionMenuComponent } from './navegacion-menu.component';
import { TokenService } from 'src/app/shared/services/token.service';
;


@NgModule({
  declarations: [NavegacionMenuComponent],
  imports: [
    CommonModule,
    NavegacionMenuRoutingModule,
    MaterialModule

  ]
})
export class NavegacionMenuModule {

  

}
