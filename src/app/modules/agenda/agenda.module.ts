import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { interceptorProvider } from 'src/app/shared/interceptors/prod-interceptor.service';
import { AgendaService } from './services/agenda.service';
import {FullCalendarModule} from '@fullcalendar/angular';

import { AgendaRoutingModule } from './agenda-routing.module';
import { VerAgendaComponent } from './pages/ver-agenda/ver-agenda.component';
import { DetallesEventoComponent } from './components/detalles-evento/detalles-evento.component';



@NgModule({
  declarations: [
    AgendaComponent,
    VerAgendaComponent,
    DetallesEventoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    AgendaRoutingModule,
    FullCalendarModule
  ],
  providers:[
    interceptorProvider,
    AgendaService,
   
  ]
})
export class AgendaModule { }
