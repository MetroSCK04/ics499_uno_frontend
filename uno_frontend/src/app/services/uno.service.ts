import { Injectable } from '@angular/core';
import { Card } from '../model/card';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Useraccount } from '../model/useraccount';
import { Player } from '../model/player';


@Injectable({
  providedIn: 'root'
})
export class UnoService {

  constructor(private http: HttpClient
    ) { }
  public all(): Observable<Card[]> {
    return this.http.get<Card[]>('http://localhost:8080/card/all');
  }
  public allUser(): Observable<Useraccount[]> {
    return this.http.get<Useraccount[]>('http://localhost:8080/useraccount/all');
  }
  //here
  private apiUrl = '/uno';

  startGame(numOfPlayers: number, gamerTags: string[]): Observable<void> {
    const startGameRequest = { numOfPlayers, gamerTags };
    return this.http.post<void>('http://localhost:8080/uno/start', startGameRequest);
  }
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>('http://localhost:8080/uno/players');
  }

  getPlayedCard(): Observable<Card> {
    return this.http.get<Card>('http://localhost:8080/uno/played-card'); 
  }


  getNextPlayer(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/uno/nextPlayer');
  }

  //here
  currentPlayerHasPlayableCard(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/uno/playableCard');
  }
  playCard(cardIndex: number, player: Player, selectedColor: string): Observable<void> {
    return this.http.post<void>('http://localhost:8080/uno/playCard', { cardIndex, player, selectedColor });
  }
  
  drawCard(player: Player): Observable<void> {
    return this.http.post<void>('http://localhost:8080/uno/drawCard', player);
  }
  
}