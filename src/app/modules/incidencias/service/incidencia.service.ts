import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrarIncidencia } from '../model/registrar-incidencia';
import { VerIncidencia } from '../model/ver-incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  URL='http://localhost:8080/api/daño'
  constructor(private httpClient:HttpClient) { }

  public listaIncidencia(page:number, size:number):Observable<any[]>{
    return this.httpClient.get<any[]>(this.URL+`?page=${page}&size=${size}`);
  }

  public registrarIncidencia(incidencia:RegistrarIncidencia):Observable<any>{
    return this.httpClient.post<RegistrarIncidencia>(this.URL,incidencia);
  }

 
}
