import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TecnicoFormComponent } from '../../components/tecnico-form/tecnico-form.component';
import { Tecnico } from '../../model/tecnico';
import { TecnicoService } from '../../services/tecnico.service';
import { TecnicosModule } from '../../tecnicos.module';

@Component({
  selector: 'app-gestion-tecnicos',
  templateUrl: './gestion-tecnicos.component.html',
  styleUrls: ['./gestion-tecnicos.component.css']
})
export class GestionTecnicosComponent implements OnInit {
  page:number=0;
  size:number=10;
  length:number;
  pageEvent: PageEvent;

  tecnicos:Tecnico[]=[];
  displayedColumns: string[] = ['nombre', 'numeroIden', 'tdano','cuadrilla','opciones'];
  tecnico:Tecnico;
  datosForm:any;
  

  constructor(private tecnicoService:TecnicoService,
              public dialog:MatDialog,
              private notificacion:MatSnackBar
              ) { }

  ngOnInit(): void {
    this.llenarTabla();
  }

  eventPage(event?:PageEvent){
    this.page=event.pageIndex;
    this.size=event.pageSize;
    this.llenarTabla();
    return event;
  }

  //Obtener los datos de los tecnicos
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



  borrarTecnico(identificacion:number):void{
    this.tecnicoService.borrarTecnico(identificacion).subscribe(
      msg=>{
        console.log(msg);
        this.notificacion.open("Borrado con exito!!!","Cerrar")
      },
      err=>{
        console.log(err);
      }
    )
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
    console.log('The dialog was closed');
    this.tecnico=result;
    //this.agregarTecnico();
    console.log(result);
  });
  }
  
  

}
