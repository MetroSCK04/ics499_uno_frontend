import { Component, Input } from '@angular/core';
import { UnoService } from '../services/uno.service';
import { Card } from '../model/card';
import { Player } from '../model/player';
import { Observable } from 'rxjs'
import { Hand } from '../model/hand';
import { Router } from '@angular/router';
import { Stat } from '../model/stat';
import { StatService } from '../services/stat.service';



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
  selectColor: boolean = false ;
  selectedColor: string = "";
 
  constructor(private unoService: UnoService, private router: Router, private statsService: StatService) {}

  addGamerTag(): void {
    this.gamerTags.push('');
  }
  onSubmit(): void {
    this.gamerTags.length = this.numOfPlayers;
    this.startGame(this.numOfPlayers, this.gamerTags);
  }

  startGame(numOfPlayers: number, gamerTags: string[]): void {
    this.unoService.startGame(numOfPlayers, gamerTags).subscribe(() => {
      this.getPlayers();
      
      console.log('Game started');
    });
    
  }
  showPlayersList = false;

  getPlayers(): void {
    var x = this.players[this.currentPlayerIndex]?.hand?.cards?.length;
    this.unoService.getPlayers().subscribe((players) => {
      this.players = players;
      this.showPlayersList = true;
      this.checkCurrentPlayerHasPlayableCardAndTakeAction();
      if(!(x == this.players[this.currentPlayerIndex].hand.cards.length))
        this.getNextPlayer();
        this.checkForWinner();
    });
  }
  onGamerTagKeyUp(event: KeyboardEvent, index: number) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.length >= 2 && index < this.gamerTags.length - 1) {
      const nextInput = inputElement.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
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

lowercaseFirstLetter(color: string): string {
  return color.charAt(0).toLowerCase() + color.slice(1);
}
// Add this variable at the class level, after any existing variables
currentPlayerIndex: number = 0;

// Add this method inside the GameComponent class, before the closing brace
getNextPlayer(): void {
  this.unoService.getNextPlayer().subscribe(
    (nextPlayerIndex) => {
      this.currentPlayerIndex = nextPlayerIndex;
      this.checkCurrentPlayerHasPlayableCardAndTakeAction();
      // Set newTurn to true whenever a new player's turn starts
     
    },
    (error) => {
      console.error("Error getting next player:", error);
    }
  );
}
//
hasPlayableCard: boolean | null = null;

checkCurrentPlayerHasPlayableCardAndTakeAction(): void {
  this.unoService.currentPlayerHasPlayableCard().subscribe(
    (hasPlayableCard) => {
      const currentPlayerHand = this.players[this.currentPlayerIndex].hand.cards;
      const hasWildCard = currentPlayerHand.some(card => card.type === 'wild' || card.type === 'wildDraw4');

      this.hasPlayableCard = hasPlayableCard || hasWildCard;
      this.getPlayedCard();
    },
    (error) => {
      console.error("Error checking if current player has playable card:", error);
    }
  );
}

playCard(cardIndex: number, selectedColor: string): void {
  console.log(cardIndex);
  console.log(this.currentPlayerIndex);
  console.log(this.players.length);

  let cardBeingPlayed = this.players[this.currentPlayerIndex].hand.cards[cardIndex-1];
  
  
  this.unoService.playCard(cardIndex, this.players[this.currentPlayerIndex],selectedColor).subscribe(
    () => {
      
      this.getPlayers();
      
      console.log("Played card successfully");
      
    this.showMessage = true;

    if (cardBeingPlayed.type !== 'skip' && cardBeingPlayed.type !== 'reverse') {
      this.newTurn = true;
    }
   
    setTimeout(() => {
      this.showMessage = false;
    }, 10000); 
      
    },
    (error) => {
      console.error("Error playing card:", error);
    }
  );
}

drawCard(): void {
  this.unoService.drawCard(this.players[this.currentPlayerIndex]).subscribe(
    () => {
      this.getPlayers();
      this.newTurn = true;
      console.log("Drew card successfully");
    },
    (error) => {
      console.error("Error drawing card:", error);
    }
  );
}
getCardImageReverse(color: string): string {
  return `./assets/reverse.${color}.jpg`;
}
getCardImageSkip(color: string): string {
  return `./assets/skip.${color}.png`;
}
getCardImageDraw2(color: string): string {
  return `./assets/draw2.${color}.jpg`;
}

shouldPlayCard(cardIndex: number, selectedColor: string): void{
    console.log(this.selectColor)
    console.log(this.selectedColor)
    console.log(this.players[this.currentPlayerIndex].hand.cards[cardIndex-1])

  if(this.players[this.currentPlayerIndex].hand.cards[cardIndex-1].type === 'wild'){
    console.log("here")
    if(selectedColor!=""){

      this.playCard(cardIndex, selectedColor);
      this.selectColor=false;
      this.selectedColor="";
      
    }
     else 
      this.selectColor=true;
     
  }
  else
    this.playCard(cardIndex, "");

}
onSelected(color: string){
 this.selectedColor = color;
}
getCards(hand: Hand) {
  return hand.cards;
}
showMessage: boolean = false;
displayHand: boolean = false;
confirmNextPlayer() {
  this.showMessage = false;
  this.displayHand = true; // Toggle the displayHand property
}

gameIsOver: boolean = false;
  winner: string = '';

  // Call this function whenever a card is played
  checkForWinner() {
    for (let player of this.players) {
      if (player.hand.cards.length === 0) {
        this.gameIsOver = true;
        this.winner = player.gameTag;
        // Update the stats
        this.statsService.addStats(this.winner, 1).subscribe((stat: Stat) => {
          console.log("Updated stats successfully:", stat);
        }, (error) => {
          console.error("Error updating stats:", error);
        });
        break;
      }
    }
  }
  newTurn: boolean = false;
confirmNewTurn(): void {
  this.newTurn = false;
}
confirmQuit(): void {
  if(confirm("Are you sure you want to quit?")) {
    this.router.navigate(['']); // or wherever you want to route
  }
}

}