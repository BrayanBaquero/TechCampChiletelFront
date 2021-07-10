import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalComponent} from './personal.component';
import { GestionTecnicosComponent } from './pages/gestion-tecnicos/gestion-tecnicos.component';
import { GestionCuadrillasComponent } from './pages/gestion-cuadrillas/gestion-cuadrillas.component';

const routes: Routes = [
  {
    path: '', component:PersonalComponent,
    children: [
      { path:'',redirectTo:'tecnicos',pathMatch:'full'},
      { path: 'tecnicos', component: GestionTecnicosComponent },
      { path: 'cuadrillas', component: GestionCuadrillasComponent },
     // { path:'',component:GestionTecnicosComponent}
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
