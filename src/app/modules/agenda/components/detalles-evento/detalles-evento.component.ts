import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendaEventos } from '../../model/agendaEventos';
import { VerAgendaComponent } from '../../pages/ver-agenda/ver-agenda.component';

@Component({
  selector: 'app-detalles-evento',
  templateUrl: './detalles-evento.component.html',
  styleUrls: ['./detalles-evento.component.css']
})
export class DetallesEventoComponent implements OnInit {

  
  constructor(public dialogRef: MatDialogRef<VerAgendaComponent>,
              @Inject(MAT_DIALOG_DATA) public data:AgendaEventos
              ) { }

  ngOnInit(): void {
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
