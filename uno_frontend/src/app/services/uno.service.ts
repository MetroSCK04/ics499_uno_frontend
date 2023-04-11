import { Injectable } from '@angular/core';
import { Card } from '../model/card';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Useraccount } from '../model/useraccount';


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
}
