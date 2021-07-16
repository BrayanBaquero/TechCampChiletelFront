import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginUsuario } from '../../model/login-usuario';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../../../shared/services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Variables login
  isLogged:boolean=false;
  isLoginFail:boolean=false;
  loginUsuario:LoginUsuario;
  nombreUsuario:string;
  password:string;
  roles:string[]=[];
  errorMsg:string;
  

  hide = true;//Control de icono mostrar contraseña
  loginForm=this.fb.group(
    {
      username: [null,Validators.required],
      password:[null,Validators.required]
    },
  );

  notConfig:any={duration:5000};//Configuracion SnackBar

  constructor(private fb: FormBuilder,
              private titleService: Title,
              private tokenService:TokenService,
              private authService:AuthService, 
              private router:Router,
              private notificacion:MatSnackBar
              ) { }

  ngOnInit(): void {
    //Validar si hay una sesion iniciada redirigira al usuario a la vista por defecto
    if(this.tokenService.getToken()){
      this.router.navigate(['/personal']);
    }

    this.titleService.setTitle("Formulario");
    if(this.tokenService.getToken()){
      this.isLogged=true;
      this.isLoginFail=false;
      this.roles=this.tokenService.getAuthorities();
    }
  }

  onLogin():void{
    this.nombreUsuario=this.loginForm.controls['username'].value;
    this.password=this.loginForm.controls['password'].value;
    this.loginUsuario=new LoginUsuario(this.nombreUsuario,this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data=>{
        this.isLogged=true;
        this.isLoginFail=false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles=data.authorities;
        this.router.navigate(['/personal']);
      },
      err=>{
        this.isLogged=false;
        this.isLoginFail=true;
        this.errorMsg=err.error.message;
        this.notificacion.open(this.errorMsg,"Ok",this.notConfig);
      }
    )
  }

  mssgError(nombreControl:string):string{
    let error='';
    const control=this.loginForm.get(nombreControl);
    if(control.touched && control.errors!=null){
      if(control.getError('required')){
        error="El dato es requerido";
      }
      if(control.getError('pattern')){
        error="Solo puede ingresar valores numericos";
      }
    }
    return error;
  }
  



}
