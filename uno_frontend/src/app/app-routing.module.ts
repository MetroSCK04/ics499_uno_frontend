import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { StatsPageComponent } from './stats-page/stats-page.component';
import { UnoPageComponent } from './uno-page/uno-page.component';/*added this for the nav*/

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'stats-page', component: StatsPageComponent },
  { path: 'uno-page', component: UnoPageComponent },/*this */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
