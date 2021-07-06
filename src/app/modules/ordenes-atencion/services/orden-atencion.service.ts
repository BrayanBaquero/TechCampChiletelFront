import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdenAtencion } from '../model/orden-atencion';

@Injectable({
  providedIn: 'root'
})
export class OrdenAtencionService {

  URL='http://localhost:8080/api/ordenatencion';
  constructor(private httpclient:HttpClient) { }

  public listaOrdenesAtencion(page:number,size:number):Observable<OrdenAtencion[]>{
    return this.httpclient.get<OrdenAtencion[]>(this.URL+`?page=${page}&size=${size}`);
  }
}
