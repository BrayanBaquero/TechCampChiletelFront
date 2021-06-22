import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginUsuario } from '../../interfaces/login-usuario';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../../../shared/services/token.service';

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
  constructor(private fb: FormBuilder,
              private titleService: Title,
              private tokenService:TokenService,
              private authService:AuthService, 
              private router:Router
              ) { }

  ngOnInit(): void {
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
        console.log(data.token);
        this.router.navigate(['/menu']);
      },
      err=>{
        this.isLogged=false;
        this.isLoginFail=true;
        this.errorMsg=err.error.message;
        console.log(this.errorMsg);

      }
    )
  }


  submit() {
    console.log(this.loginForm.getRawValue())
    console.log(this.loginForm.controls['username'].value);
    console.log(this.loginForm.controls['usename'].invalid)
    console.log("Hola mundo")
    
  }
  getErrorMessage() {
    
    if (this.loginForm.controls['username'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['username'].hasError('username') ? 'Not a valid email' : 'bbbb';
  }
  



}
