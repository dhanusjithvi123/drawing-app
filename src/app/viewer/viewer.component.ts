import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements AfterViewInit {
  @ViewChild('viewerCanvas') viewerCanvas!: ElementRef<HTMLCanvasElement>;
  drawingData: any;
  private ctx!: CanvasRenderingContext2D;

  constructor(private socketService: SocketService) {}

  ngAfterViewInit() {
    this.ctx = this.viewerCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

    // Set up initial drawing settings (you can adjust these as needed)
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 2;

    this.socketService.drawingData$.subscribe((data) => {
      console.log('Received drawing data:', data); // Debugging line

      if (data && data.type === 'draw') {
        this.drawingData = data;
        this.drawPoint(data.x, data.y);
      } else if (data && data.type === 'end') {
        // Handle the end of drawing (clear the canvas or perform other actions)
      } else if (data && data.type === 'clear') {
        // Clear the canvas
        this.clearCanvas();
      }
    });
  }

  private drawPoint(x: number, y: number) {
    console.log('Drawing point:', x, y); // Debugging line

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  private clearCanvas() {
    // Clear the canvas by filling it with the background color
    this.ctx.fillStyle = 'aquamarine';
    this.ctx.fillRect(0, 0, this.viewerCanvas.nativeElement.width, this.viewerCanvas.nativeElement.height);
  }
}
