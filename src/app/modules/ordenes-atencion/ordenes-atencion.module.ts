import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenesAtencionRoutingModule } from './ordenes-atencion-routing.module';
import { OrdenesAtencionComponent } from './ordenes-atencion.component';
import { VerOrdenesComponent } from './pages/ver-ordenes/ver-ordenes.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { OrdenAtencionService } from './services/orden-atencion.service';
import { interceptorProvider } from 'src/app/shared/interceptors/prod-interceptor.service';


@NgModule({
  declarations: [
    OrdenesAtencionComponent, 
    VerOrdenesComponent],
  imports: [
    CommonModule,
    OrdenesAtencionRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers:[
    OrdenAtencionService,
    interceptorProvider
  ]
})
export class OrdenesAtencionModule { }
