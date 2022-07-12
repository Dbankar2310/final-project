import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // set some validations to the admin for login such as username and password

  loginForm: FormGroup | any;
  title = 'material-login';
  constructor(private fb:FormBuilder,private router:Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.pattern(
        'admin@123',
      ),]),
      password: new FormControl('', [Validators.required,Validators.pattern(
        'admin@321'
      )])
    });
  }

  ngOnInit(): void {
  }

  // redirect the admin to admin-panel after entering the corect credentials

  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    localStorage.setItem('user',this.loginForm.value)
    this.router.navigate(['/adminPanel'])//route to the admin panel
  }



}
