import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Useraccount } from '../model/useraccount';
import { UnoService } from '../services/uno.service';
import { UsrinfoaccountService } from '../services/usrinfoaccount.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userinfo: UsrinfoaccountService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  userAccounts: Useraccount[] = [];

  ngOnInit() {
    this.userinfo.all().subscribe(users => {
      this.userAccounts = users as unknown as Useraccount[];
      console.log(this.userAccounts);
    });
  }

  onSubmit() {
    // Save the entered username and password in variables
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    // Check if the entered username and password are correct
    if (this.isPasswordCorrect(this.username, this.password)) {
      // Navigate to the home page with the username parameter
      this.router.navigate([''], { queryParams: { username: this.username } });
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }

  isPasswordCorrect(username: string, password: string): boolean {
    for (const user of this.userAccounts) {
      if (user.username === username && user.password === password) {
        return true;
      }
    }
    return false;
  }
}