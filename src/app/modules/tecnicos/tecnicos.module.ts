import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TecnicosComponent } from './tecnicos.component';
import { GestionTecnicosComponent } from './pages/gestion-tecnicos/gestion-tecnicos.component';
import { GestionCuadrillasComponent } from './pages/gestion-cuadrillas/gestion-cuadrillas.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { TecnicosRoutingModule } from './tecnicos-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TecnicoService } from './services/tecnico.service';
import { interceptorProvider } from 'src/app/shared/interceptors/prod-interceptor.service';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TecnicoFormComponent } from './components/tecnico-form/tecnico-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CuadrillaService } from './services/cuadrilla.service';
import { CuadrillaFormComponent } from './components/cuadrilla-form/cuadrilla-form.component';



@NgModule({
  declarations: [
    TecnicosComponent, 
    GestionTecnicosComponent, 
    GestionCuadrillasComponent, 
    TabMenuComponent, 
    TecnicoFormComponent, 
    CuadrillaFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    TecnicosRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers:[
    TecnicoService,
    CuadrillaService,
    interceptorProvider
  ],
})
export class TecnicosModule { }
