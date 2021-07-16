import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const MODULESMATERIAL=[
  MatCardModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  LayoutModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatGridListModule,
  OverlayModule,
  MatProgressBarModule
]

@NgModule({
  declarations: [],
  imports: [MODULESMATERIAL
  ],
  exports:[MODULESMATERIAL]
})
export class MaterialModule { }
