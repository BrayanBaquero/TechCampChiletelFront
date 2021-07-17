import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeConfirmacionComponent } from '../../components/mensaje-confirmacion/mensaje-confirmacion.component';
import { TecnicoFormComponent } from '../../components/tecnico-form/tecnico-form.component';
import { Tecnico } from '../../model/tecnico';
import { TecnicoService } from '../../services/tecnico.service';

@Component({
  selector: 'app-gestion-tecnicos',
  templateUrl: './gestion-tecnicos.component.html',
  styleUrls: ['./gestion-tecnicos.component.css']
})
export class GestionTecnicosComponent implements OnInit {
  /*Variables de paginador */
  page:number=0;
  size:number=10;
  length:number;
  pageEvent: PageEvent;

  
/*Variable de tabla*/
  tecnicos:Tecnico[]=[];
  displayedColumns: string[] = ['nombre', 'numeroIden', 'tdano','cuadrilla','opciones'];
  tecnico:Tecnico;
  datosForm:any;
  notConfig:any={duration:5000 }//Configuracion de snackBar
  
  /*Overlay tipos de daño */
  isOpen = false;
  triggerOrigin:any;//Referencia a usada para mostrar overlay de tipos de daño
  tdanosRowelement:string[];

  constructor(private tecnicoService:TecnicoService,
              public dialog:MatDialog,
              private notificacion:MatSnackBar
              ) { }

  ngOnInit(): void {
    this.llenarTabla();
  }

  //Activar la informacion adicional de tipos de daño
  toggle(trigger:any,rowEl:string[]){
    this.triggerOrigin=trigger;
    this.tdanosRowelement=rowEl;
    this.isOpen=!this.isOpen;
  }
 /*Evento que se activa al interactuar con el paginador */
  eventPage(event?:PageEvent){
    this.page=event.pageIndex;
    this.size=event.pageSize;
    this.llenarTabla();
    return event;
  }

  //Obtener los datos de los técnicos
  llenarTabla():void{
    this.tecnicoService.listaTecnicos(this.page,this.size).subscribe(
      data=>{
        this.tecnicos=data["content"];
        this.length=data["totalElements"];
      },
      err=>{
        console.log(err);
      }
    );
  }

/*Borrar técnico seleccionado */
  borrarTecnico(identificacion:number):void{
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '400px',
      data:"Está seguro que desea eliminar al técnico seleccionado?",
      disableClose:true
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==true){
        this.tecnicoService.borrarTecnico(identificacion).subscribe(
          msg=>{
            this.notificacion.open(msg.message,"",this.notConfig);
            this.llenarTabla();
          },
          err=>{
             //console.log(err);
             this.notificacion.open("Erros inesperado, intentelo de nuevo.","Ok",this.notConfig);
            }
        );
      }
      
    });
    
  }

  //Abrir formulario para agregar y editar usuario;
  openDialog(opcion:number,dTecnico?:Tecnico): void {
    const dialogConfig = new MatDialogConfig();

    switch(opcion){
      case 1:{
        this.datosForm={titulo:"AGREGAR",tecnico:null};
        break;
      }
      case 2:{
        this.datosForm={titulo:"ACTUALIZAR",tecnico:dTecnico};
        break;
      }
      case 3:{
        this.datosForm={titulo:"DETALLES",tecnico:dTecnico};
        break;
      }
    }

    const dialogRef = this.dialog.open(TecnicoFormComponent, {
      width: '350px',
      data:this.datosForm,
      disableClose: true
    });
    
  //Recibe los datos diligenciados en el formulario y llama a la función correspondiente 
  //para acceder al servicio y enviar los datos.
  dialogRef.afterClosed().subscribe(result => {
    this.tecnico=result;
    this.llenarTabla();
  });
  }
  
  

}
