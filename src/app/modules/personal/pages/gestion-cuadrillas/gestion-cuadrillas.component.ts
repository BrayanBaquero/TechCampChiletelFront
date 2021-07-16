import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuadrillaFormComponent } from '../../components/cuadrilla-form/cuadrilla-form.component';
import { MensajeConfirmacionComponent } from '../../components/mensaje-confirmacion/mensaje-confirmacion.component';
import { Cuadrilla } from '../../model/cuadrilla';
import { CuadrillaService } from '../../services/cuadrilla.service';

@Component({
  selector: 'app-gestion-cuadrillas',
  templateUrl: './gestion-cuadrillas.component.html',
  styleUrls: ['./gestion-cuadrillas.component.css']
})
export class GestionCuadrillasComponent implements OnInit {

  page:number=0;
  size:number=10;
  length:number;
  pageEvent: PageEvent;


  cuadrillas:Cuadrilla[]=[];
  columnasTabla: string[] = ['nombre', 'miembros', 'zonas','opciones'];
  notConfig:any={duration:5000};
  dataSource:any[];
  cuadrilla:Cuadrilla;
  datosForm:any;

  isOpen = false;
  triggerOrigin:any;//Referencia a usada para mostrar overlay de tipos de daño
  tdanosRowelement:string[];

  constructor(private cuadrillaService:CuadrillaService,
              public dialog:MatDialog,
              private notificacion:MatSnackBar
              ) { }

  ngOnInit(): void {
    this.llenarTabla();
  }

  toggle(trigger:any,rowEl:string[]){
    this.triggerOrigin=trigger;
    this.tdanosRowelement=rowEl;
    this.isOpen=!this.isOpen;
    console.log("Hola: "+this.tdanosRowelement)
  }
  
  eventPage(event?:PageEvent){
    this.page=event.pageIndex;
    this.size=event.pageSize;
    this.llenarTabla();
    return event;
  }

  llenarTabla():void{
    this.cuadrillaService.listaCuadrilla(this.page,this.size).subscribe(
      data=>{
        this.cuadrillas=data["content"];
        this.length=data["totalElements"];
      },
      err=>{}
    )
  }

  borrarTecnico(nombre:string):void{
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data:"Esta seguro que desea eliminar la cuadrilla seleccionada?",
      disableClose:true
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==true){
          this.cuadrillaService.borrarCuadrilla(nombre).subscribe(
            msg=>{
              this.notificacion.open(msg.message,"",this.notConfig)
              this.llenarTabla();
            },
            err=>{ console.log(err);}
          );
       }
      });
  }

  openDialog(opcion:number,dCuadrilla?:Cuadrilla): void{
    const dialogConfig = new MatDialogConfig();

    switch(opcion){
      case 1:{
        this.datosForm={titulo:"AGREGAR",cuadrilla:null};
        break;
      }
      case 2:{
        this.datosForm={titulo:"ACTUALIZAR",cuadrilla:dCuadrilla};
        break;
      }
    }

    const dialogRef = this.dialog.open(CuadrillaFormComponent, {
      width: '400px',
      data:this.datosForm,
      disableClose: true
    });
    
  //Recibe los datos diligenciados en el formulario y llama a la función correspondiente 
  //para acceder al servicio y enviar los datos.
  dialogRef.afterClosed().subscribe(result => {
    this.cuadrilla=result;
    this.llenarTabla();
  });

  }


}
