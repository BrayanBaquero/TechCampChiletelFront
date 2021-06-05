import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


import { LayoutModule } from '@angular/cdk/layout';
//import { MatToolbarModule } from '@angular/material/toolbar';
//import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
//import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import {MatTabsModule} from '@angular/material/tabs';

const MODULESMATERIAL=[
  MatCardModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,

  LayoutModule,
  //MatToolbarModule,
  //MatButtonModule,
  MatSidenavModule,
 // MatIconModule,
  MatListModule,

  MatTabsModule

]

@NgModule({
  declarations: [],
  imports: [MODULESMATERIAL
  ],
  exports:[MODULESMATERIAL]
})
export class MaterialModule { }
