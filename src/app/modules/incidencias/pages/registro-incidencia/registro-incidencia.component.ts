import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import { RegistrarIncidencia } from '../../model/registrar-incidencia';
import { IncidenciaService } from '../../service/incidencia.service';

@Component({
  selector: 'app-registro-incidencia',
  templateUrl: './registro-incidencia.component.html',
  styleUrls: ['./registro-incidencia.component.css']
})
export class RegistroIncidenciaComponent implements OnInit {

  incidenciaDatos:RegistrarIncidencia;
  tiposIncidencia:string[]=['total','parcial','esporadica'];

  patronNumeros=/^[1-9]\d{6,18}$/;
  /*Campos formulario */
  IncidenciaForm=this.fb.group({
    cliente:[null,[Validators.required,Validators.pattern(this.patronNumeros)]],
    tipoDaño:[null,Validators.required],
    descripcion:[null,[Validators.required,Validators.maxLength(150)]]
  });

  constructor(private incidenciaService:IncidenciaService,
              private fb:FormBuilder,
              private notificacion:MatSnackBar
              ) { }

  ngOnInit(): void {
  }
  /*Registrar incidencia */
  enviar():void{
    this.incidenciaDatos=this.IncidenciaForm.getRawValue();
    this.incidenciaService.registrarIncidencia(this.incidenciaDatos).subscribe(
      resp=>{
        this.IncidenciaForm.reset();
        this.notificacion.open(resp.message,'Cerrar');
      },
      err=>{
        this.notificacion.open(err.error.message,'Cerrar');
        
      }
    )
  }
/*Control de errores de formulario */
  mssgError(nombreControl:string):string{
    let error='';
    const control=this.IncidenciaForm.get(nombreControl);
    if(control.touched && control.errors!=null){
      if(control.getError('required')){
        error="El dato es requerido.";
      }
      if(control.getError('pattern')){
        error="Solo puede ingresar valores numericos.";
      }
    }
    return error;
  }

}
