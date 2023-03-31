import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StatsPageComponent } from './stats-page/stats-page.component';
import { UnoPageComponent } from './uno-page/uno-page.component';
import { PopUpComponent } from './pop-up/pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StatsPageComponent,
    UnoPageComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    FormsModule, 
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'stats-page', component: StatsPageComponent },
      { path: 'uno-page', component: UnoPageComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
