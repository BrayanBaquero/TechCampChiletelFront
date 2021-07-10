import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoCliente } from '../../model/tipo-cliente';
import { ConfiguracionService } from '../../service/configuracion.service';

@Component({
  selector: 'app-tipo-cliente',
  templateUrl: './tipo-cliente.component.html',
  styleUrls: ['./tipo-cliente.component.css']
})
export class TipoClienteComponent implements OnInit {

  tipoClientes: TipoCliente[] = [];
  columnasTabla: string[] = ['nombre', 'prioridad'];
  prioridades: number[] = [];
  TiposClienteForm: FormGroup;
  tamaño: number;
  EnvioDatos: TipoCliente[] = [];
  notConfig: any = {
    duration: 5000
  }



  constructor(private configuracionService: ConfiguracionService,
    private notificacion: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.TiposClienteForm = this.fb.group({
      tCliente: this.fb.array([])
    });
    this.configuracionService.arrayFormTipoCliente().subscribe(tDaños => {
      this.TiposClienteForm.setControl('tCliente', tDaños);
      this.tamaño = this.tCliente.length;
      this.prioridades = Array.from({ length: this.tamaño }).map((_, i) => i + 1);

    });


  }

  get tCliente(): FormArray {
    return this.TiposClienteForm.get('tCliente') as FormArray;
  }



  guardar(): void {
    this.EnvioDatos = this.TiposClienteForm.get('tCliente').value;
    console.log(this.EnvioDatos);
    this.configuracionService.actualizarTiposCliente(this.EnvioDatos).subscribe(
      msg => {
        this.notificacion.open(msg.message, "", this.notConfig);
      })

  }


}
