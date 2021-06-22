import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { Tecnico } from '../../model/tecnico';
import { TecnicoService } from '../../services/tecnico.service';
import { TecnicosModule } from '../../tecnicos.module';

@Component({
  selector: 'app-gestion-tecnicos',
  templateUrl: './gestion-tecnicos.component.html',
  styleUrls: ['./gestion-tecnicos.component.css']
})
export class GestionTecnicosComponent implements OnInit {

  tecnicos:Tecnico[]=[];
  displayedColumns: string[] = ['nombre', 'numeroIden', 'tdano','cuadrilla','opciones'];
  dataSource:any[];
  tecnico:Tecnico;
  datosForm:any;
  

  constructor(private tecnicoService:TecnicoService,
              public dialog:MatDialog,
              private notificacion:MatSnackBar
              ) { }

  ngOnInit(): void {
    this.tecnicoService.listaTecnicos().subscribe(
      data=>{
        this.tecnicos=data;
        console.log(this.tecnicos);
        console.log(this.tecnicos[0].tdano);
        this.llenarTabla(this.tecnicos);
      },
      err=>{
        console.log(err);
      }
    );
  }

  //Obtener los datos de los tecnicos
  llenarTabla(tecnicos:Tecnico[]):void{
    this.dataSource=this.tecnicos;
  }

  //Funcion para agregar tecnico
  agregarTecnico(){
    this.tecnicoService.agregarTecnico(this.tecnico).subscribe(
      res=>{
        console.log(res);
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

    const dialogRef = this.dialog.open(ModalDialogComponent, {
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
