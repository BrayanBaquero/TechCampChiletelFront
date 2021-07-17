import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditCuadrilla } from '../../model/add-edit-cuadrilla';
import { Cuadrilla } from '../../model/cuadrilla';
import { GestionCuadrillasComponent } from '../../pages/gestion-cuadrillas/gestion-cuadrillas.component';
import { CuadrillaService } from '../../services/cuadrilla.service';

@Component({
  selector: 'app-cuadrilla-form',
  templateUrl: './cuadrilla-form.component.html',
  styleUrls: ['./cuadrilla-form.component.css']
})
export class CuadrillaFormComponent implements OnInit {
  patronNombre=/^([A-Za-z])+$/;

  cuadrilla:AddEditCuadrilla;
  zonasList: string[] = ['Valdivia', 'Corral', 'Lanco','Los lagos','Marfil','Mariqina','Paillaco','Panquipulli'];
  notConfig:any={
    duration:5000
  }
  CuadrillaForm=this.fb.group(
    {
      nombre:     [null,[Validators.required,Validators.maxLength(20),Validators.minLength(3),Validators.pattern(this.patronNombre)]],
      zona:      [[],Validators.required],
    }
  );

  constructor(public dialogRef: MatDialogRef<GestionCuadrillasComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private fb: FormBuilder,
              private cuadrillaService:CuadrillaService,
              private notificacion:MatSnackBar) { }

  ngOnInit(): void {
    if(this.data.cuadrilla!=null){
      this.cuadrilla=this.data.cuadrilla;
      this.CuadrillaForm.controls['nombre'].setValue(this.cuadrilla.nombre);
      this.CuadrillaForm.controls['zona'].setValue(this.cuadrilla.zona);
    }
  }
 /*Cerrar dialog */
  cerrar(): void {
    this.dialogRef.close();
  }

      /*Verificar si va agregar un nuevo usuario o se van a actualizar los datos de 
    un usuario ya existente. Llama a la funcion correspondiente que se encargara de llamar
    al servicio http*/
    enviar():void{
      this.cuadrilla=this.CuadrillaForm.getRawValue();
      if(this.data.titulo=="AGREGAR"){
        this.agregarCuadrilla();
      }else{
        this.actualizarCuadrilla();
      }
    }

    /*Agregar cuadrilla*/
    agregarCuadrilla():void{
      this.cuadrillaService.agregarCuadrilla(this.cuadrilla).subscribe(
        msg=>{
          this.notificacion.open(msg.message,"",this.notConfig);
          this.dialogRef.close();
        },
        err=>{
          console.log(err.error.message);
          this.notificacion.open(err.error.message,"Cerrar");
        }
      )
    }
    /*Actualizar cuadrilla*/
    actualizarCuadrilla():void{
      this.cuadrillaService.actualizarCuadrilla(this.cuadrilla,this.cuadrilla.nombre).subscribe(
        msg=>{
          console.log(msg);
          this.notificacion.open(msg.message,"",this.notConfig);
          this.dialogRef.close();
        },
        err=>{
          console.log(err)
        }
      )
    }
    /*Manejo de errores*/
    mssgError(nombreControl:string):string{
      let error='';
      const control=this.CuadrillaForm.get(nombreControl);
      if(control.touched && control.errors!=null){
        if(control.getError('required')){
          error="El dato es requerido";
        }
        if(control.getError('pattern')){
          error="Nombre invalido.";
        }
        if(control.getError('minlength')){
          error=`Longitud debe ser mayor a ${control.getError('minlength').requiredLength}`;
        }
        if(control.getError('maxlength')){
          error=`Longitud debe ser menor a ${control.getError('maxlength').requiredLength}`;
        }
        
      }
      return error;
    }

}
