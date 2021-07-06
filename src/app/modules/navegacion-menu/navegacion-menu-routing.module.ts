import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TecnicosModule } from '../tecnicos/tecnicos.module';
import { NavegacionMenuComponent } from './navegacion-menu.component';

const routes: Routes = [
  {
    path:'',component:NavegacionMenuComponent,
    children: [
      {path:'tecnicos',loadChildren:()=> import('../tecnicos/tecnicos.module').then(m=>m.TecnicosModule)},
      {path:'configuracion',loadChildren:()=> import('../configuracion/configuracion.module').then(m=>m.ConfiguracionModule)},
      {path:'incidencias',loadChildren:()=> import('../incidencias/incidencias.module').then(m=>m.IncidenciasModule)},
      {path:'ordenes',loadChildren:()=> import('../ordenes-atencion/ordenes-atencion.module').then(m=>m.OrdenesAtencionModule)},
      {path:'',loadChildren:()=> import('../tecnicos/tecnicos.module').then(m=>m.TecnicosModule)}
     // {path: '**',redirectTo:'viewClient'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavegacionMenuRoutingModule { }
