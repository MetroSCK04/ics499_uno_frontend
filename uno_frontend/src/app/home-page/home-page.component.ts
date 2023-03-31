import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  public username: string = '';
  message: string = 'Fields are working';

  constructor(private router: Router, private dialog: MatDialog) { }

  goToStats() {
    this.router.navigate(['/stat-page']);
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

