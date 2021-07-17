import { Component, Inject, OnInit } from '@angular/core';
import { GestionTecnicosComponent } from '../../pages/gestion-tecnicos/gestion-tecnicos.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Tecnico } from '../../model/tecnico';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TecnicoService } from '../../services/tecnico.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuadrillaService } from '../../services/cuadrilla.service';
import { RxwebValidators as Rxweb } from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-tecnico-form',
  templateUrl: './tecnico-form.component.html',
  styleUrls: ['./tecnico-form.component.css']
})
export class TecnicoFormComponent implements OnInit{
  tecnico:Tecnico;
  danosList: string[] = ['total', 'parcial', 'esporadica'];
  nombresCuadrillas:string[];

  notConfig:any={ duration:5000}//Configuracion de snackbar

  /*Expreciones regulares para validación de campos */
  patronNumeros=/^[1-9]\d{6,18}$/;
  patronLetras=/^[a-z ,.'-]+$/i;
  patronNumeroTelefonico=/^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){10})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){10}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;
  
  //Definicion de campos de formulario para CRUD
  TecnicosForm=this.fb.group(
    {
      nombre:     [null,[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern(this.patronLetras)]],
      apellido:   [null,[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern(this.patronLetras)]],
      numeroIden: [null,[Validators.required,Validators.pattern(this.patronNumeros)]],
      email:      [null,[Validators.required,Validators.email]],
      telefono:   [null,[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern(this.patronNumeroTelefonico)]],
      direccion:  [null,[Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      cuadrilla:  [null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
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
      /*Inicializar formulario */
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
    /*Llamada a la api para obtener las cuadrillas disponibles*/
    cuadrillas():void{
      this.cuadrillaService.listaNombresCuadrillas().subscribe(
        data=>{
          this.nombresCuadrillas=data;
        },
        err=>{}
      );
    }
    /*Cerrar dialog formulario */
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
    /*Agregar un nuevo tecnico */
    agregarTecnico():void{
      this.tecnicoService.agregarTecnico(this.tecnico).subscribe(
        msg=>{
          //this.notificacion.open("Tecnico agregado con exito!!","Cerrar");
          this.notificacion.open(msg.message,"",this.notConfig);
          this.dialogRef.close();
        },
        err=>{
          console.log(err.error.errorMessage);
          this.notificacion.open(err.error.message,"Cerrar");

        }
      )
    }
    /*Actualizar tecnico selecionado */
    actualizarTecnico():void{
      this.tecnicoService.actualizarTecnico(this.tecnico,this.tecnico.numeroIden).subscribe(
        msg=>{
          this.notificacion.open(msg.message,"",this.notConfig);
          this.dialogRef.close();
        },
        err=>{
          console.log(err)
        }
      )
    }

    /*Control de mensajes de error */
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
      if(control.getError('minlength')){
        error=`Longitud debe ser mayor a ${control.getError('minlength').requiredLength}`;
      }
      if(control.getError('maxlength')){
        error=`Longitud debe ser menor a ${control.getError('maxlength').requiredLength}`;
      }

      if(control.getError('pattern')){
        
        if(control.getError('pattern').requiredPattern==this.patronLetras){
          error="Solo puede ingresar letras";
        }
        if(control.getError('pattern').requiredPattern==this.patronNumeros){
          error="Solo puede ingresar valores numericos";
        }
        if(control.getError('pattern').requiredPattern==this.patronNumeroTelefonico){
          error="Numero de telefono invalido.";
        }
      }
    }
    return error;
  }
}
