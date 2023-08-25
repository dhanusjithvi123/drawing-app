import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private drawingDataSubject = new BehaviorSubject<any>(null);
  drawingData$: Observable<any> = this.drawingDataSubject.asObservable();

  constructor() {
    this.socket = io('http://localhost:3000', { transports: ['websocket'] });
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on('drawing', (data: any) => {
      console.log('Received drawing data:', data);
      this.drawingDataSubject.next(data);
    });
  }

  sendDrawingData(data: any) {
    console.log('Sending drawing data:', data);
    this.socket.emit('drawing', data);
  }

  updateDrawingData(data: any) {
    this.drawingDataSubject.next(data);
  }
}
