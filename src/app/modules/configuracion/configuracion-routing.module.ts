import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './configuracion.component';
import { TipoDanoComponent } from './pages/tipo-dano/tipo-dano.component';
import { TipoUsuarioComponent } from './pages/tipo-usuario/tipo-usuario.component';

const routes: Routes = [
  {path:'',component:ConfiguracionComponent,
  children:[
    {path:'daño',component:TipoDanoComponent},
    {path:'usuario',component:TipoUsuarioComponent}
  ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
