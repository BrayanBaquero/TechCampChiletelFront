import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators} from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  loginForm=this.fb.group(
    {
      email: [null,Validators.required, Validators.email],
      password:[null,Validators.required]
    }
  );
  constructor(private fb: FormBuilder,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Formulario");
  }


  submit() {
    
  }
  getErrorMessage() {
    
    if (this.fb.control['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.fb.control['email'].hasError('email') ? 'Not a valid email' : '';
  }
  


}
