import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuadrillaFormComponent } from '../../components/cuadrilla-form/cuadrilla-form.component';
import { Cuadrilla } from '../../model/cuadrilla';
import { CuadrillaService } from '../../services/cuadrilla.service';

@Component({
  selector: 'app-gestion-cuadrillas',
  templateUrl: './gestion-cuadrillas.component.html',
  styleUrls: ['./gestion-cuadrillas.component.css']
})
export class GestionCuadrillasComponent implements OnInit {
  cuadrillas:Cuadrilla[]=[];
  columnasTabla: string[] = ['nombre', 'miembros', 'zonas','opciones'];
  notConfig:any={duration:5000};
  dataSource:any[];
  cuadrilla:Cuadrilla;
  datosForm:any;
  constructor(private cuadrillaService:CuadrillaService,
              public dialog:MatDialog,
              private notificacion:MatSnackBar
              ) { }

  ngOnInit(): void {
    this.cuadrillaService.listaCuadrilla().subscribe(
      data=>{
        this.cuadrillas=data;
        this.llenarTabla();
      },
      err=>{

      }
    )
  }

  llenarTabla():void{
    this.dataSource=this.cuadrillas;
    console.log(this.cuadrillas);
  }

  borrarTecnico(nombre:string):void{
    this.cuadrillaService.borrarCuadrilla(nombre).subscribe(
      msg=>{
        console.log(msg);
        this.notificacion.open("Borrado con exito!!!","Cerrar",this.notConfig)
      },
      err=>{
        console.log(err);
      }
    )
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
    console.log('The dialog was closed');
    this.cuadrilla=result;
    //this.agregarTecnico();
    console.log(result);
  });

  }


}
