import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StatsPageComponent } from './stats-page/stats-page.component';
import { UnoPageComponent } from './uno-page/uno-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StatsPageComponent,
    UnoPageComponent
  ],
  imports: [
    BrowserModule,
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
