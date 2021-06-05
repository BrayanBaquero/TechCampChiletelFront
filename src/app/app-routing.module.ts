import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavegacionMenuModule } from './modules/navegacion-menu/navegacion-menu.module';

const routes: Routes = [
  {path:'auth',loadChildren:'./modules/auth/auth.module#AuthModule'},
  //{path:'menu',loadChildren:'./modules/navegacion-menu/navegacion-menu.module#NavegacionMenuModule'}
  {path:'',loadChildren:()=> import('./modules/navegacion-menu/navegacion-menu.module').then(m=>m.NavegacionMenuModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
