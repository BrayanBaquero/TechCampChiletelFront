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

  ordenesAtencion:OrdenAtencion[];
  displayedColumns: string[] =['numOrden','cliente','incidencia'];

  constructor(private ordenAtencionservice: OrdenAtencionService) { }

  ngOnInit(): void {
    this.llenarTabla();
  }

  eventPage(event?:PageEvent){
    this.page=event.pageIndex;
    this.size=event.pageSize;
    this.llenarTabla();
    return event;
  }
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
