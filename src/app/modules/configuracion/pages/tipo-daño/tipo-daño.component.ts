import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoDaño } from '../../model/tipo-daño';
import { ConfiguracionService } from '../../service/configuracion.service';

@Component({
  selector: 'app-tipo-dano',
  templateUrl: './tipo-daño.component.html',
  styleUrls: ['./tipo-daño.component.css']
})
export class TipoDañoComponent implements OnInit {
  tipoDaños:TipoDaño[]=[];
  columnasTabla: string[] = ['nombre','prioridad','tiempo'];
  prioridades:number[]=[];
  tiempoAtencion:number[]=[1,2,3,4,5,6,7,8];
  TiposDanoForm:FormGroup;
  tamaño:number;
  EnvioDatos:TipoDaño[]=[];
  notConfig:any={
    duration:5000
  }

  

  constructor(private configuracionService:ConfiguracionService,
              private notificacion:MatSnackBar,
              private fb:FormBuilder
               ) { }

  ngOnInit(): void {
    this.TiposDanoForm=this.fb.group({
      tDanos:this.fb.array([])
    });
    this.configuracionService.arrayFormTipoDaño().subscribe(tDaños=>{
      this.TiposDanoForm.setControl('tDanos',tDaños);
      this.tamaño=this.tDanos.length;
      this.prioridades= Array.from({length:this.tamaño}).map((_, i) => i+1);
      
    });
    
    
  }

  get tDanos():FormArray{
    return this.TiposDanoForm.get('tDanos') as FormArray;
  }


  
  guardar():void{
    console.log("hola")
      
      this.EnvioDatos=this.TiposDanoForm.get('tDanos').value;
      console.log(this.EnvioDatos);
      this.configuracionService.actualizarTiposDaño(this.EnvioDatos).subscribe(
        msg=>{
          this.notificacion.open(msg.message,"",this.notConfig);
        })

  }


}
