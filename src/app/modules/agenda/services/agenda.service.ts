import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgendaEventos } from '../model/agendaEventos';


@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  
  URL='http://localhost:8080/api/agenda'
  constructor(private httpClient: HttpClient) { }

  public listaAgenda(page:number,size:number):Observable<any[]>{
    return this.httpClient.get<any[]>(this.URL+`?page=${page}&size=${size}`);
  }

  public agendaTecnico(ident:number,fechaInicio:string,fechaFinal:string):Observable<AgendaEventos[]>{
    return this.httpClient.get<AgendaEventos[]>(this.URL+`/${ident}/tecnico?fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`);
  }
  public generarAgenda():Observable<any>{
    return this.httpClient.post<any>(this.URL,'hola');
  }
  
}
