import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TecnicosComponent } from './tecnicos.component';
import { GestionTecnicosComponent } from './pages/gestion-tecnicos/gestion-tecnicos.component';
import { GestionCuadrillasComponent } from './pages/gestion-cuadrillas/gestion-cuadrillas.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { TecnicosRoutingModule } from './tecnicos-routing.module';



@NgModule({
  declarations: [
    TecnicosComponent, 
    GestionTecnicosComponent, 
    GestionCuadrillasComponent, 
    TabMenuComponent],
  imports: [
    CommonModule,
    TecnicosRoutingModule
  ]
})
export class TecnicosModule { }
