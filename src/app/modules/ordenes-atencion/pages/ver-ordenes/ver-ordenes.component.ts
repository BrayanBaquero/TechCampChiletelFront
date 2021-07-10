import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { OrdenAtencion } from '../../model/orden-atencion';
import { OrdenAtencionService } from '../../services/orden-atencion.service';

@Component({
  selector: 'app-ver-ordenes',
  templateUrl: './ver-ordenes.component.html',
  styleUrls: ['./ver-ordenes.component.css']
})
export class VerOrdenesComponent implements OnInit {
  //Definiciones de paginacion de tabla
  page:number=0;
  size:number=10;
  length:number;
  pageEvent: PageEvent;

  ordenesAtencion:OrdenAtencion[];//Data-source de tabla
  displayedColumns: string[] =['numOrden','cliente','incidencia'];//Columnas de tabla

  constructor(private ordenAtencionservice: OrdenAtencionService) { }

  ngOnInit(): void {
    this.llenarTabla();
  }

 //Evento de interaccion con paginador
  eventPage(event?:PageEvent){
    this.page=event.pageIndex;
    this.size=event.pageSize;
    this.llenarTabla();
    return event;
  }

  //Llamado a api para obtener datos y llenar la tabla
  llenarTabla():void{
    this.ordenAtencionservice.listaOrdenesAtencion(this.page,this.size).subscribe(
      data=>{
        this.ordenesAtencion=data["content"];
        this.length=data["totalElements"];
        console.log(this.ordenesAtencion);
      },
      err=>{console.log(err)}
    );
  }

}
