import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavegacionMenuComponent } from './navegacion-menu.component';
import { TecnicosGuardService as guard } from '../../shared/guards/prod-guard.service';


const routes: Routes = [
  {
    path:'',component:NavegacionMenuComponent,
    children: [
      {path:'personal',loadChildren:()=> import('../personal/personal.module').then(m=>m.PersonalModule),canActivate: [guard],data: { expectedRol: ['admin', 'user']}},
      {path:'configuracion',loadChildren:()=> import('../configuracion/configuracion.module').then(m=>m.ConfiguracionModule),canActivate: [guard],data: { expectedRol: ['admin', 'user']}},
      {path:'incidencias',loadChildren:()=> import('../incidencias/incidencias.module').then(m=>m.IncidenciasModule),canActivate: [guard],data: { expectedRol: ['admin', 'user']}},
      {path:'ordenes',loadChildren:()=> import('../ordenes-atencion/ordenes-atencion.module').then(m=>m.OrdenesAtencionModule),canActivate: [guard],data: { expectedRol: ['admin', 'user']}},
      {path:'agenda',loadChildren:()=> import('../agenda/agenda.module').then(m=>m.AgendaModule),canActivate: [guard],data: { expectedRol: ['admin', 'user']}},
      {path:'autenticacion',loadChildren:()=> import('../auth/auth.module').then(m=>m.AuthModule)},
      {path:'',loadChildren:()=> import('../auth/auth.module').then(m=>m.AuthModule)},
      // {path:'',loadChildren:()=> import('../personal/personal.module').then(m=>m.PersonalModule)}
     // {path: '**',redirectTo:'viewClient'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavegacionMenuRoutingModule { }
