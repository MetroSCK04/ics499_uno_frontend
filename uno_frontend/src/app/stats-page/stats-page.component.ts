import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent {
  pageTitle = 'Board Game Stats';
  gamesPlayed = 0;
  gamesWon = 0;
  winPercentage = 0;
  selectedPeriod = '';
  updateStats(): void {
    // Code to update stats based on user input or API calls
    this.winPercentage = this.gamesPlayed > 0 ? (this.gamesWon / this.gamesPlayed) * 100 : 0;
  }
  showStats(period: string) {
    this.selectedPeriod = period;
  }
}
