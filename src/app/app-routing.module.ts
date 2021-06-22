import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TecnicosGuardService as guard } from './shared/guards/prod-guard.service';

const routes: Routes = [
  //{path:'menu',loadChildren:'./modules/navegacion-menu/navegacion-menu.module#NavegacionMenuModule'}
  {path:'menu',loadChildren:()=> import('./modules/navegacion-menu/navegacion-menu.module').then(m=>m.NavegacionMenuModule),canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
  //{path:'auth',loadChildren:'./modules/auth/auth.module#AuthModule'},
  {path:'',loadChildren:()=> import('./modules/auth/auth.module').then(m=>m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
