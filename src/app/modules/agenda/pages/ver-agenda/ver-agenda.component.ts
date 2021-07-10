import { AfterViewInit, Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AgendaEventos } from '../../model/agendaEventos';
import { AgendaTecnicos } from '../../model/agenda-tecnicos';
import { AgendaService } from '../../services/agenda.service';

import { CalendarOptions,Calendar} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import {FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { DetallesEventoComponent } from '../../components/detalles-evento/detalles-evento.component';


@Component({
  selector: 'app-ver-agenda',
  templateUrl: './ver-agenda.component.html',
  styleUrls: ['./ver-agenda.component.css']
})
export class VerAgendaComponent implements OnInit {

  calendarOptions: CalendarOptions;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;//Acceso a la api de FullCallendar

  //Variables usadas para paginar la columna que muestra los tecnicos
  length:number;
  page:number=0;
  size:number=10;
  pageEvent:PageEvent

  agendaTecnicos:AgendaTecnicos[]; //Almacenar array de tecnico obtenidos de la api
  agendaEventos:AgendaEventos[];   //Almacenar array de aventos que se obtiene de la api cuando se selecciona algun tecnico
  displayedColumns: string[] =['tecnicos'];
  tecnicoSeleccionado:number;

  //Fecha para obtener la agenda por tecnico de semanas anteriores
  fechaInicio:string; //Fecha inicio de semana obtenida del calendario
  fechaFinal:string;  //Fecha de finalizacion de semana obtenida del calendareio
  events:any[];     //Array donde se almacenan eventos que se vizualizaran en fullCalendar
  selectedRowIndex:any;

  

  constructor(private agendaService:AgendaService,
              public dialog:MatDialog) { }

  ngOnInit(): void {
    this.cargarTecnicos();//Obtener lista de técnicos
    forwardRef(() => Calendar);
    this.calendarOptions= {
      plugins: [timeGridPlugin,dayGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      //eventColor:'blue',
      //aspectRatio:3.2,
      slotMinTime:'08:00:00',//Hora inicio
      slotMaxTime:'16:00:00',//Hora final
      expandRows:true,  //Expandir alto de columnas para adaptarce a tamaño de calendario
      allDaySlot:false,//Quitar fila allDay
      titleFormat:{ year: 'numeric', month: 'long', day: 'numeric' } ,
      locale:esLocale, //Lenguaje en españo
      selectable: true,
      eventClick:this.detallesEvento.bind(this),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendar'
      },
      customButtons:{
        prev:{
          text:"<",
          click:this.semanaAnterior.bind(this)
        },
        next:{
          text:">",
          click:this.semanaSiguiente.bind(this)
        },
        agendar:{
          text:"Generar agenda",
          click:this.agendar.bind(this)
        }
      }
    };
    
  }

  //Evento para paginar columna de tecnicos
  eventPage(event?:PageEvent){
    this.page=event.pageIndex;
    this.size=event.pageSize;
    this.cargarTecnicos();
    return event;
  }
  //Llamado a servicio http para obtener los tecnicos
  cargarTecnicos():void{
    this.agendaService.listaAgenda(this.page,this.size).subscribe(
      data=>{
        this.agendaTecnicos=data["content"];//Lista de tecnicos activos paginados size default=10
        this.length=data["totalElements"];//Total de tecnicos activos
        if(this.agendaTecnicos.length>0){
          this.tecnicoSeleccionado=this.agendaTecnicos[0].identificacion;
          //this.obtenerAgendaTecnico();
          this.selectedRowIndex=this.agendaTecnicos[0].identificacion;//Cambiar solor al primer tecnico si existe
        }

      },
      err=>{console.log(err)}
    );
  }
  //Llamado a servicio http para obtener la agenda semanal de un tecnico en especifico (Buscar por identificacion)
  obtenerAgendaTecnico(){
    this.ObetenerRangoFechasCalendario();//Actualizar fechas de inicio y final
    this.agendaService.agendaTecnico(this.tecnicoSeleccionado,this.fechaInicio,this.fechaFinal).subscribe(
      data=>{
        this.agendaEventos=data;
        this.events=[];
        //Llenar array de eventos para cargar en fullCalendar
        this.agendaEventos.forEach(elm=>{
          this.events.push({title:elm.ord_Id,start:elm.inicio,end:elm.final});
        });
        //console.log(this.events);
        this.calendarOptions.events=this.events;//Cargar eventos en el calendario
      },err=>console.log(err)
    );
  }

  //Evento que se llama al seleccionar un tecnico, se obtiene la identificacion del tecnico y se obtiene la agenda del mismo
  selecTecnico(row){
    this.selectedRowIndex = row.identificacion;
    this.tecnicoSeleccionado=row.identificacion;
    //console.log(this.selectedRowIndex);
    this.obtenerAgendaTecnico();
  }

  semanaAnterior(arg){
    this.calendarComponent.getApi().prev();
    this.obtenerAgendaTecnico()
  }
  semanaSiguiente(arg){
    this.calendarComponent.getApi().next();
    this.obtenerAgendaTecnico();
  }
  
  ObetenerRangoFechasCalendario(){
    this.fechaInicio=this.cambiarFormatoFecha(this.calendarComponent.getApi().view.activeStart);
    this.fechaFinal=this.cambiarFormatoFecha(this.calendarComponent.getApi().view.activeEnd);
    console.log(this.fechaInicio);
    console.log(this.fechaFinal);
  }
  cambiarFormatoFecha(fecha:Date):string{
    let mes=fecha.getMonth()+1;
    return fecha.getDate()+'-'+mes+'-'+fecha.getFullYear();
  }

  //La funcion se ejecuta cuado se da clic en "Generar Agenda" y se encarga de mediante una peticion post llamar al 
  //Procedimeinto almacenado encargado de realizar el proceso masivo.
  agendar(){
    this.agendaService.generarAgenda().subscribe(
      data=>{
        console.log("resp: "+data.message);
      },
      err=>{
        console.log(err.error.message);
        //alert("err: "+err.g);
      }
    );
  }

  //Ver detalles del evento o orden de atencion agenda al dar click sobre el calendario
  detallesEvento(event){
    let id_ord=event.event._def.title;
    const dialogRef = this.dialog.open(DetallesEventoComponent, {
      //width: '350px',
      data:this.agendaEventos.find(ele=>ele.ord_Id=id_ord),
      //disableClose: true
    });
  }

  
}
