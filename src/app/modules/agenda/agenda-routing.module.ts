import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './agenda.component';
import { VerAgendaComponent } from './pages/ver-agenda/ver-agenda.component';

const routes: Routes = [

  {path:'',component:AgendaComponent,
  children:[
    {path:'agenda',component:VerAgendaComponent},
    {path:'',component:VerAgendaComponent},
  ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
