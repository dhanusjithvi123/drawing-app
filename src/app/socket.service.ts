import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;

  constructor() {
    this.socket = io('http://localhost:3000', { transports : ['websocket'] }); // Replace with your server URL
      
  }

  // Send drawing data to the server
  sendDrawingData(data: any) {
    this.socket.emit('drawing', data);
  }

  // Receive drawing data from the server
  onDrawingData(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('drawing', (data: any) => {
        observer.next(data);
      });
    });
  }
}
