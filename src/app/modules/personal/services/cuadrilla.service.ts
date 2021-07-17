import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddEditCuadrilla } from '../model/add-edit-cuadrilla';
import { Cuadrilla } from '../model/cuadrilla';

@Injectable({
  providedIn: 'root'
})
export class CuadrillaService {
  //URL='http://localhost:8080/api/cuadrilla/';
  URL=`${environment.apiUrl}/api/cuadrilla/`;
  constructor(private httpClient:HttpClient) { }

  public listaCuadrilla(page:number,size:number):Observable<Cuadrilla[]>{
    return this.httpClient.get<Cuadrilla[]>(this.URL+`?page=${page}&size=${size}`);
  }

  public listaNombresCuadrillas():Observable<string[]>{
    return this.httpClient.get<string[]>(this.URL+"nombres");
  }

  public agregarCuadrilla(cuadrilla:AddEditCuadrilla):Observable<any>{
    return this.httpClient.post<AddEditCuadrilla>(this.URL,cuadrilla);
  }

  public actualizarCuadrilla(cuadrilla:AddEditCuadrilla,nombre:string):Observable<any>{
    return this.httpClient.put<AddEditCuadrilla>(this.URL+nombre,cuadrilla);
  }

  public borrarCuadrilla(nombre:string):Observable<any>{
    return this.httpClient.delete<any>(this.URL+nombre);
  }
}
