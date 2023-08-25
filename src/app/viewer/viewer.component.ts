import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-viewer',
  template: `<div>{{ drawingData | json }}</div>`,
})
export class ViewerComponent implements OnInit {
  drawingData: any;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.drawingData$.subscribe((data) => {
      this.drawingData = data;
    });
  }
}
