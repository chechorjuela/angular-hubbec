import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private url = 'http://localhost:3000'; // Cambia esta URL por la dirección de tu servidor de sockets
  private socket: Socket;

  constructor() {
    this.socket = io(this.url);
  }

  public connect(): void {
    this.socket = io('http://localhost:3000'); // cambia esta URL por la dirección de tu servidor de sockets Express
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  public on(eventName: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }
}
