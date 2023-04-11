import { Injectable } from '@angular/core';
import { Useraccount } from '../model/useraccount';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsrinfoaccountService {

  constructor(private http: HttpClient
    ) { }

  public all(): Observable<Useraccount[]> {
    return this.http.get<Useraccount[]>('http://localhost:8080/useraccount/all');
  }
  public createUser(user: {email: string, username: string, password: string}): Observable<Useraccount> {
    return this.http.post<Useraccount>('http://localhost:8080/useraccount/add', user);
  }
}
