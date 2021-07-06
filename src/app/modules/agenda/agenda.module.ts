import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { interceptorProvider } from 'src/app/shared/interceptors/prod-interceptor.service';
import { AgendaService } from './services/agenda.service';
import { OrdenAtencionService } from './services/orden-atencion.service';
import { OrdenAtencionComponent } from './pages/orden-atencion/orden-atencion.component';



@NgModule({
  declarations: [AgendaComponent, OrdenAtencionComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  providers:[
    interceptorProvider,
    AgendaService,
    OrdenAtencionService
  ]
})
export class AgendaModule { }
