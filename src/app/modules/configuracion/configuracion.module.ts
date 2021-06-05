import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionComponent } from './configuracion.component';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { TipoDanoComponent } from './pages/tipo-dano/tipo-dano.component';
import { TipoUsuarioComponent } from './pages/tipo-usuario/tipo-usuario.component';
import { MaterialModule } from 'src/app/shared/material/material.module';



@NgModule({
  declarations: [ConfiguracionComponent, TipoDanoComponent, TipoUsuarioComponent],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    MaterialModule
  ]
})
export class ConfiguracionModule { }
