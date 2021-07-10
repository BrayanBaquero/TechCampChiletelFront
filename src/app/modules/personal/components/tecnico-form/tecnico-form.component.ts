import { Component, Inject, OnInit } from '@angular/core';
import { GestionTecnicosComponent } from '../../pages/gestion-tecnicos/gestion-tecnicos.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Tecnico } from '../../model/tecnico';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TecnicoService } from '../../services/tecnico.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuadrillaService } from '../../services/cuadrilla.service';

@Component({
  selector: 'app-tecnico-form',
  templateUrl: './tecnico-form.component.html',
  styleUrls: ['./tecnico-form.component.css']
})
export class TecnicoFormComponent implements OnInit{
  tecnico:Tecnico;
  danosList: string[] = ['total', 'parcial', 'esporadica'];
  nombresCuadrillas:string[];
  //Definicion de campos de formulario para CRUD
  TecnicosForm=this.fb.group(
    {
      nombre:     [null,[Validators.required,Validators.maxLength(10)]],
      apellido:   [null,Validators.required],
      numeroIden: [null,[Validators.required,Validators.pattern(/^[1-9]\d{6,10}$/)]],
      email:      [null,[Validators.required,Validators.email]],
      telefono:   [null,Validators.required],
      direccion:  [null,Validators.required],
      cuadrilla:  [null,Validators.required],
      tdano :     [[],Validators.required],
    },
  );
  


  constructor(
    public dialogRef: MatDialogRef<GestionTecnicosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private tecnicoService:TecnicoService,
    private cuadrillaService: CuadrillaService,
    private notificacion:MatSnackBar) {}

    ngOnInit(){
      this.cuadrillas();//Obtener la lista de nombres de las cuadrillas

      if(this.data.tecnico!=null){
        this.tecnico=this.data.tecnico;
        this.TecnicosForm.controls['nombre'].setValue(this.tecnico.nombre);
        this.TecnicosForm.controls['apellido'].setValue(this.tecnico.apellido);
        this.TecnicosForm.controls['numeroIden'].setValue(this.tecnico.numeroIden);
        this.TecnicosForm.controls['email'].setValue(this.tecnico.email);
        this.TecnicosForm.controls['telefono'].setValue(this.tecnico.telefono);
        this.TecnicosForm.controls['direccion'].setValue(this.tecnico.direccion);
        this.TecnicosForm.controls['cuadrilla'].setValue(this.tecnico.cuadrilla);
        this.TecnicosForm.controls['tdano'].setValue(this.tecnico.tdano);
      }
      if(this.data.titulo=="DETALLES"){
        this.TecnicosForm.disable();
      }
      if(this.data.titulo=="ACTUALIZAR"){
        this.TecnicosForm.controls["numeroIden"].disable();
      }

    }

    cuadrillas():void{
      this.cuadrillaService.listaNombresCuadrillas().subscribe(
        data=>{
          this.nombresCuadrillas=data;
        },
        err=>{}
      );
    }

    cerrar(): void {
      this.dialogRef.close();
    }
    
    /*Verificar si va agregar un nuevo usuario o se van a actualizar los datos de 
    un usuario ya existente. Llama a la funcion correspondiente que se encargara de llamar
    al servicio http*/
    enviar():void{
      this.tecnico=this.TecnicosForm.getRawValue();
      if(this.data.titulo=="AGREGAR"){
        this.agregarTecnico();
      }else{
        this.actualizarTecnico();
      }
    }

    agregarTecnico():void{
      this.tecnicoService.agregarTecnico(this.tecnico).subscribe(
        msg=>{
          console.log(msg);
          this.notificacion.open("Tecnico agregado con exito!!","Cerrar");
          this.dialogRef.close();
        },
        err=>{
          console.log(err.error.errorMessage);
          this.notificacion.open(err.error.message,"Cerrar");

        }
      )
    }
    actualizarTecnico():void{
      this.tecnicoService.actualizarTecnico(this.tecnico,this.tecnico.numeroIden).subscribe(
        msg=>{
          console.log(msg)
          this.dialogRef.close();
        },
        err=>{
          console.log(err)
        }
      )
    }

  mssgError(nombreControl:string):string{
    let error='';
    const control=this.TecnicosForm.get(nombreControl);
    if(control.touched && control.errors!=null){
      if(control.getError('email')){
        error="Email invalido";
      }
      if(control.getError('required')){
        error="El dato es requerido";
      }
      if(control.getError('pattern')){
        error="Solo puede ingresar valores numericos";
      }
    }
    return error;
  }
}
