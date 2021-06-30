import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { interceptorProvider } from 'src/app/shared/interceptors/prod-interceptor.service';
import { IncidenciasComponent } from './incidencias.component';
import { RegistroIncidenciaComponent } from './pages/registro-incidencia/registro-incidencia.component';
import { VerIncidenciaComponent } from './pages/ver-incidencia/ver-incidencia.component';
import { IncidenciaService } from './service/incidencia.service';
import { IncidenciasRoutingModule } from './incidencias-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    IncidenciasComponent, 
    RegistroIncidenciaComponent, 
    VerIncidenciaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IncidenciasRoutingModule
  ],
  providers:[
    interceptorProvider,
    IncidenciaService
  ]
})
export class IncidenciasModule { }
