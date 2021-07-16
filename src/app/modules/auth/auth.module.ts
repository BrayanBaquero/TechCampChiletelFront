import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { AuthComponent } from './auth.component';




@NgModule({
  declarations: [
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  exports:[RegisterComponent],
  providers: [AuthService],

})
export class AuthModule { }
