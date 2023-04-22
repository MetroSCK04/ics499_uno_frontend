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
  selectedCard: Card | null = null;
  discardPile: any = [];
  currentIdx = 0;
  showPlayersList = false;
  showGamerTags = false;
  playedCard: Card | null = null;

  constructor(private unoService: UnoService) { }

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
      this.getPlayers();
    });
  }

  getPlayers(): void {
    this.unoService.getPlayers().subscribe((players) => {
      this.players = players;
      this.showPlayersList = true;
    });
  }

  onNumOfPlayersEntered() {
    this.showGamerTags = true;
    this.gamerTags = Array(this.numOfPlayers).fill('');
  }

  getPlayedCard(): void {
    this.unoService.getPlayedCard().subscribe((card) => {
      this.playedCard = card;
      this.discardPile.push(card);
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

  canPlayCard(card: Card): boolean {
    const topCard: Card = this.discardPile[this.discardPile.length - 1];

    if (topCard.color === card.color || topCard.num === card.num) {
      return true;
    }
    if (card.num.toString() === 'Wild' || card.num.toString() === 'Wild Draw Four') {
      return true;
    }
    return false;
  }

  nextPlayer() {
    this.currentIdx = (this.currentIdx + 1) % this.numOfPlayers;
    return this.players[this.currentIdx];
  }

  selectCardFunc() {
    this.selectedCard = null;
    const cardLength = this.players[this.currentIdx].hand.cards.length;
    for (let index = 0; index < cardLength; index++) {
      const element: Card = this.players[this.currentIdx].hand.cards[index];
      if (this.playedCard?.color === element.color || this.playedCard?.num === element.num) {
        this.selectedCard = element;
        this.playCard()
        return;
      }
    }
    if (!this.selectedCard) {
      const randomIdx = Math.floor(Math.random() * (cardLength + 1));
      this.selectedCard = this.players[this.currentIdx].hand.cards[randomIdx]
      this.playCard()
      return;
    }
  }

  playCard() {
    console.log('play next ===');
    if (!this.selectedCard) {
      alert('please select a card to play');
      return;
    }

    if (!this.canPlayCard(this.selectedCard)) {
      alert('No have match card!');
      this.playedCard = this.selectedCard;
      // return;
    }

    if (this.selectedCard) {
      const idx = this.players[this.currentIdx].hand.cards.indexOf(this.selectedCard);
      if (idx !== -1) {
        this.players[this.currentIdx].hand.cards.splice(idx, 1)
      }

      this.discardPile.push(this.selectedCard);
      this.selectedCard = null;
      this.nextPlayer();
      // if ((this.currentIdx + 1) === this.numOfPlayers) {
      //   this.currentIdx = 0;
      //   this.discardPile = [];
      //   this.discardPile.push(this.playedCard);
      // }
    }
  }

}
