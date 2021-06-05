import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';




@NgModule({
  declarations: [
    RegisterComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule
  ],
  exports:[RegisterComponent]
})
export class AuthModule { }
