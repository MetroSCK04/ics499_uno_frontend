import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stat } from '../model/stat';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  private apiUrl = 'http://localhost:8080/stats';

  constructor(private http: HttpClient) { }

  getStat(gameTag: string): Observable<Stat> {
    return this.http.get<Stat>(`${this.apiUrl}/byGameTag/${gameTag}`);
  }

  getAllStats(): Observable<Stat[]> {
    return this.http.get<Stat[]>(`${this.apiUrl}/all`);
  }

  addStats(gameTag: string, gamesWon: number): Observable<Stat> {
    return this.http.post<Stat>(`${this.apiUrl}/add`, { gameTag, gamesWon });
  }

  updateStats(gameTag: string, gamesWon: number): Observable<Stat> {
    return this.http.put<Stat>(`${this.apiUrl}/update`, { gameTag, gamesWon });
  }
}
