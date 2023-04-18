import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StatsPageComponent } from './stats-page/stats-page.component';
import { UnoPageComponent } from './uno-page/uno-page.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateAccPageComponent } from './create-acc-page/create-acc-page.component';
import { UnoCardComponent } from './uno-page/uno-card/uno-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StatsPageComponent,
    UnoPageComponent,
    PopUpComponent,
    LoginPageComponent,
    CreateAccPageComponent,
    UnoCardComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'stats-page', component: StatsPageComponent },
      { path: 'uno-page', component: UnoPageComponent },
      { path: 'login-page', component: LoginPageComponent },
      { path: 'create-page', component: CreateAccPageComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }