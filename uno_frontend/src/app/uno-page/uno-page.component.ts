import { Component, Input } from '@angular/core';
import { UnoService } from '../services/uno.service';
import { Card } from '../model/card';
import { Player } from '../model/player';


@Component({
  selector: 'app-uno-page',
  templateUrl: './uno-page.component.html',
  styleUrls: ['./uno-page.component.css']
})
export class UnoPageComponent {

  title = 'uno-frontend';
  numOfPlayers: number = 2;
  gamerTags: string[] = [''];
  initialHands: Card[][] = [];
  players: Player[] = [];

  constructor(private unoService: UnoService) {}

  addGamerTag(): void {
    this.gamerTags.push('');
  }
  onSubmit(): void {
    this.gamerTags.length = this.numOfPlayers;
    this.startGame(this.numOfPlayers, this.gamerTags);
  }

  startGame(numOfPlayers: number, gamerTags: string[]): void {
    this.unoService.startGame(numOfPlayers, gamerTags).subscribe(() => {
      console.log('Game started');
    });
  }
  showPlayersList = false;
  getPlayers(): void {
    this.unoService.getPlayers().subscribe((players) => {
      this.players = players;
      this.showPlayersList = true;
    });
  }
  showGamerTags = false;
  onNumOfPlayersEntered() {
    this.showGamerTags = true;
    this.gamerTags = Array(this.numOfPlayers).fill('');
  }
  playedCard: Card | null = null;

getPlayedCard(): void {
  this.unoService.getPlayedCard().subscribe((card) => {
    this.playedCard = card;
  });
  }
  // uno-game.component.ts
checkAndPlayCard(playerId: number): void {
  this.unoService.checkPlayerHasPlayableHand(playerId).subscribe((hasPlayableHand) => {
    if (hasPlayableHand) {
      // Prompt the user to choose a card
      const cardIndexInput = prompt('Enter the number corresponding to the card you would like to play');
const cardIndex = parseInt(cardIndexInput !== null ? cardIndexInput : '');


      // Play the chosen card
      this.unoService.playCard(playerId, cardIndex).subscribe((playedCard) => {
        this.playedCard = playedCard;
      });
    } else {
      // Handle the case when the player does not have a playable hand
    }
  });
}
lowercaseFirstLetter(color: string): string {
  return color.charAt(0).toLowerCase() + color.slice(1);
}

}