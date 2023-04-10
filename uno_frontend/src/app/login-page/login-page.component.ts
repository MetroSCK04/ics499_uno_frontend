import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  loginForm: FormGroup;


  constructor(private router: Router,private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // Save the entered username in a variable
    this.username = this.loginForm.value.username;

    // navigate to the home page with the username parameter
    this.router.navigate([''], { queryParams: { username: this.username } });
  }

}
