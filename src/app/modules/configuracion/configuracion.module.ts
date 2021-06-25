import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionComponent } from './configuracion.component';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { TipoDañoComponent } from './pages/tipo-daño/tipo-daño.component';
import { TipoClienteComponent } from './pages/tipo-cliente/tipo-cliente.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ConfiguracionService } from './service/configuracion.service';
import { HttpClientModule } from '@angular/common/http';
import { interceptorProvider } from 'src/app/shared/interceptors/prod-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConfiguracionComponent, 
    TipoDañoComponent, 
    TipoClienteComponent],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers:[
    ConfiguracionService,
    interceptorProvider
  ]
})
export class ConfiguracionModule { }
