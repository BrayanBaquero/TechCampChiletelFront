import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tecnico } from '../model/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  URL='http://localhost:8080/api/tecnico/';
  constructor(private httpcClient:HttpClient) { }

  public listaTecnicos():Observable<Tecnico[]>{
    return this.httpcClient.get<Tecnico[]>(this.URL);
  }

  public agregarTecnico(tecnico:Tecnico):Observable<any>{
    return this.httpcClient.post<Tecnico>(this.URL,tecnico);
  }

  public actualizarTecnico(tecnico:Tecnico,iden:number):Observable<any>{
    return this.httpcClient.put<Tecnico>(this.URL+iden,tecnico);
  }

  public tecnico(iden:number):Observable<Tecnico>{
    return this.httpcClient.get<Tecnico>(this.URL+iden);
  }

  public borrarTecnico(iden:number):Observable<any>{
    return this.httpcClient.delete<any>(this.URL+iden);
  }
}
