import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  {path:'',loadChildren:()=> import('./modules/navegacion-menu/navegacion-menu.module').then(m=>m.NavegacionMenuModule)},
  //{path:'h',loadChildren:()=> import('./modules/navegacion-menu/navegacion-menu.module').then(m=>m.NavegacionMenuModule),canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
