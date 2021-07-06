import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenesAtencionComponent } from './ordenes-atencion.component';
import { VerOrdenesComponent } from './pages/ver-ordenes/ver-ordenes.component';

const routes: Routes = [
  {
    path: '', component: OrdenesAtencionComponent,
    children: [
      {path:'ver',component:VerOrdenesComponent},
      {path:'',component:VerOrdenesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenesAtencionRoutingModule { }
