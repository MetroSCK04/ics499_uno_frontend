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


  constructor(private router: Router,private formBuilder: FormBuilder, private userinfo: UsrinfoaccountService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  //here
 
  userAccounts: Useraccount[] = [];

  ngOnInit() {
    this.userinfo.all().subscribe(users => {
      this.userAccounts = users as unknown as Useraccount[];
      console.log(this.userAccounts)
       
    });

  }
  //here

  onSubmit() {
    // Save the entered username in a variable
    this.username = this.loginForm.value.username;
  
    // Check if the entered username is already taken
    if (this.isUsernameTaken(this.username)) {
      alert('This username is already taken. Please enter a different username.');
    } else {
      // navigate to the home page with the username parameter
      this.router.navigate([''], { queryParams: { username: this.username } });
    }
  }
  
  isUsernameTaken(username: string): boolean {
    for (const user of this.userAccounts) {
      if (user.username === username) {
        return true;
      }
    }
    return false;
  }

}
