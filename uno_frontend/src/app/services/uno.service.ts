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
  // uno-game.service.ts
  playCard(playerId: number, cardIndex: number): Observable<Card> {
    return this.http.post<Card>('http://localhost:8080/player/${playerId}/play-card', { cardIndex });
  }
  // uno-game.service.ts
  checkPlayerHasPlayableHand(playerId: number): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/player/${playerId}/has-playable-hand');
  }


  //here
}