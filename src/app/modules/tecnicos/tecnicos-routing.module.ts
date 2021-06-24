import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TecnicosModule } from './tecnicos.module';
import { TecnicosComponent} from './tecnicos.component';
import { GestionTecnicosComponent } from './pages/gestion-tecnicos/gestion-tecnicos.component';
import { GestionCuadrillasComponent } from './pages/gestion-cuadrillas/gestion-cuadrillas.component';

const routes: Routes = [
  {path:'',component:GestionTecnicosComponent},
  {path:'cuadrillas',component:GestionCuadrillasComponent}
    //{path:'',component:TecnicosComponent,}
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecnicosRoutingModule { }
