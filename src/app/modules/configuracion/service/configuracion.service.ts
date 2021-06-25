import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoCliente } from '../model/tipo-cliente';
import { TipoDaño } from '../model/tipo-daño';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  URL='http://localhost:8080/api/configuracion'
  constructor(private httpCient: HttpClient) { }

  public listaTiposDaño():Observable<TipoDaño[]>{
    return this.httpCient.get<TipoDaño[]>(this.URL+"/tipodano")
  }

  public actualizarTiposDaño(tDanos:TipoDaño[]):Observable<any>{
    console.log(tDanos);
    return this.httpCient.put<TipoDaño[]>(this.URL+"/tipodano/",tDanos);
  }

  public listaTiposCliente():Observable<TipoCliente[]>{
    return this.httpCient.get<TipoCliente[]>(this.URL+"/tipocliente")
  }

  public actualizarTiposCliente(tCliente:TipoCliente[]):Observable<any>{
    return this.httpCient.put<TipoCliente[]>(this.URL+"/tipocliente",tCliente);
  }

  /////Contruir fomularios tipos de daño
  public arrayFormTipoDaño():Observable<FormArray>{
    return this.listaTiposDaño().pipe(map((tiposDaño:TipoDaño[])=>{
      const fgs=tiposDaño.map(TipoDaño.tdFormGroup);
      return new FormArray(fgs);
    }));
  }

   /////Contruir fomularios tipos de cliente
   public arrayFormTipoCliente():Observable<FormArray>{
    return this.listaTiposCliente().pipe(map((tiposCliente:TipoCliente[])=>{
      const fgs=tiposCliente.map(TipoCliente.tCFormGroup);
      return new FormArray(fgs);
    }));
  }
}
