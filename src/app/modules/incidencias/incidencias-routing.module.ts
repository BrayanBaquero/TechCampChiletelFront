import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidenciasComponent } from './incidencias.component';
import { RegistroIncidenciaComponent } from './pages/registro-incidencia/registro-incidencia.component';
import { VerIncidenciaComponent } from './pages/ver-incidencia/ver-incidencia.component';


const routes: Routes = [
  {
    path: '', component: IncidenciasComponent,
    children: [
      { path: 'registro', component: RegistroIncidenciaComponent },
      { path: 'ver', component: VerIncidenciaComponent },
      { path: '', component: RegistroIncidenciaComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidenciasRoutingModule { }
