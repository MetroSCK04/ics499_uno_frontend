import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;

  public connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = (event) => {
      console.log('WebSocket open: ', event);
    };

    this.socket.onerror = (event) => {
      console.log('WebSocket error: ', event);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket close: ', event);
    };
  }

  public send(message: string): void {
    this.socket.send(message);
  }

  public close(): void {
    this.socket.close();
  }

  public onMessage(): Observable<MessageEvent> {
    return new Observable(observer => {
      this.socket.onmessage = (event) => observer.next(event);
    });
  }
}
