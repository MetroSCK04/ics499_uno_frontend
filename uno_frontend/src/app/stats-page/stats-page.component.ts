import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StatService } from '../services/stat.service';
import { Stat } from '../model/stat';


@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent {
  public username: string = '';
  message: string = 'Fields are working';

  constructor(private router: Router,private route: ActivatedRoute, private statService: StatService) { }

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
  ngOnInit() {
    this.getStats();
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }

  stats: Stat[] = [];
  getStats(): void {
    this.statService.getAllStats().subscribe((stats) => {
        this.stats = stats;
    });
}

  
}
