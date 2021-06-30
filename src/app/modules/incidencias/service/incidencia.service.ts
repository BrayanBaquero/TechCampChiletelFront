import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrarIncidencia } from '../model/registrar-incidencia';
import { VerIncidencia } from '../model/ver-incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  URL='http://localhost:8080/api/daño/'
  constructor(private httpClient:HttpClient) { }

  public listaIncidencia():Observable<VerIncidencia[]>{
    return this.httpClient.get<VerIncidencia[]>(this.URL);
  }

  public registrarIncidencia(incidencia:RegistrarIncidencia):Observable<any>{
    return this.httpClient.post<RegistrarIncidencia>(this.URL,incidencia);
  }
}
