import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from '../model/jwt-dto';
import { LoginUsuario } from '../model/login-usuario';
import { NuevoUsuario } from '../model/nuevo-usuario';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //authURL='http://localhost:8080/auth/';
  authURL=`${environment.apiUrl}/auth/`;
  constructor(private httpcClient:HttpClient) { }

  public nuevo(nuevoUsuario:NuevoUsuario):Observable<any>{
    return this.httpcClient.post<any>(this.authURL+'nuevo',nuevoUsuario);
  }

  public login(loginUsuario:LoginUsuario):Observable<JwtDTO>{
    return this.httpcClient.post<JwtDTO>(this.authURL+'login',loginUsuario);
  }
}

