import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Home/home.component';
import { StatsComponent } from './Stats/stats.component';
import { UnoComponent } from './Uno/uno.component';/*added this for the nav*/

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'uno', component: UnoComponent },/*this */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
