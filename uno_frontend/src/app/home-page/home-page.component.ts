import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { UnoService } from '../services/uno.service';
import { Card } from '../model/card';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit{
  public username: string = '';
  message: string = 'Fields are working';
  cards: Card[] = [];

  constructor(private router: Router, private dialog: MatDialog,private route: ActivatedRoute, private unoservice: UnoService) { }

  goToStats() {
    this.router.navigate(['/stat-page']);
  }
  ngOnInit() {
    console.log("hello")
    // Get the username from the parameter
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });

    this.unoservice.all().subscribe(card => {
      this.cards = card as unknown as Card[];
      console.log(this.cards)

      //example for loop to get shirt attributes

     
    });

  }
  

  openDialog() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '400px',
      data: { username: this.username }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.username) {
        this.username = result.username;
      }
    });
  }
}
