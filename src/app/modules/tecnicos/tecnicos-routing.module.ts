import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TecnicosModule } from './tecnicos.module';
import { TecnicosComponent} from './tecnicos.component';

const routes: Routes = [
  {
    path:'',component:TecnicosComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecnicosRoutingModule { }
