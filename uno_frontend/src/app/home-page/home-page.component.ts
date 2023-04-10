import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit{
  public username: string = '';
  message: string = 'Fields are working';

  constructor(private router: Router, private dialog: MatDialog,private route: ActivatedRoute) { }

  goToStats() {
    this.router.navigate(['/stat-page']);
  }
  ngOnInit() {
    // Get the username from the parameter
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
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

