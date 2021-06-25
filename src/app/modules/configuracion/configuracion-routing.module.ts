import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './configuracion.component';
import { TipoDañoComponent } from './pages/tipo-daño/tipo-daño.component';
import { TipoClienteComponent } from './pages/tipo-cliente/tipo-cliente.component';

const routes: Routes = [
  {path:'',component:ConfiguracionComponent,
  children:[
    {path:'tipodano',component:TipoDañoComponent},
    {path:'tipocliente',component:TipoClienteComponent},
    {path:'',component:TipoDañoComponent},
  ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
