import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Useraccount } from '../model/useraccount';
import { UsrinfoaccountService } from '../services/usrinfoaccount.service';

@Component({
  selector: 'app-create-acc-page',
  templateUrl: './create-acc-page.component.html',
  styleUrls: ['./create-acc-page.component.css']
})
export class CreateAccPageComponent {
  username: string = '';
  password: string = '';
  email: string ='';
  loginForm: FormGroup;


  constructor(private router: Router,private formBuilder: FormBuilder,private userinfo: UsrinfoaccountService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
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
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
  
    // Check if the entered username is already taken
    if (this.isEmailTaken(this.email)) {
      alert('This email is already taken. Please enter a different email.');
    }
    else if (this.isUsernameTaken(this.username)) {
      alert('This username is already taken. Please enter a different username.');
    } else {
      // navigate to the home page with the username parameter
      this.userinfo.createUser({ email: this.email, username: this.username, password: this.password }).subscribe(
        (user: Useraccount) => {
          // Redirect the user to the login page or any other desired page
          this.router.navigate([''], { queryParams: { username: this.username } });
        },
        (error) => {
          // Handle any error that might occur during the user creation process
          console.error('Error creating user:', error);
          alert('An error occurred while creating your account. Please try again.');
        }
      );
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
  isEmailTaken(email: string): boolean {
    for (const user of this.userAccounts) {
      if (user.email === email) {
        return true;
      }
    }
    return false;
  }

}