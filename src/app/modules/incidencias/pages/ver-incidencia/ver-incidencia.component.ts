import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { VerIncidencia } from '../../model/ver-incidencia';
import { IncidenciaService } from '../../service/incidencia.service';

@Component({
  selector: 'app-ver-incidencia',
  templateUrl: './ver-incidencia.component.html',
  styleUrls: ['./ver-incidencia.component.css']
})
export class VerIncidenciaComponent implements OnInit {

  page:number=0;
  size:number=10;
  length:number;
  pageEvent: PageEvent;
  incidencias:VerIncidencia[];
  displayedColumns: string[] = ['cliente','tipo','fecha'];

  constructor(private incidenciaService:IncidenciaService) { }

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
    this.incidenciaService.listaIncidencia(this.page,this.size).subscribe(
      data=>{
        this.incidencias=data["content"];
        this.length=data["totalElements"]
        //console.log(this.incidencias);
      },
      err=>{
        console.log(err);
      }
    );
    
  }

}
