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
  private ctx!: CanvasRenderingContext2D; // Canvas rendering context

  constructor(private socketService: SocketService) {}

  ngAfterViewInit() {
    // Initialize the canvas context
    this.ctx = this.viewerCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

    // Set up initial drawing settings (line style)
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 2;

    // Subscribe to drawing data updates from the socket service
    this.socketService.drawingData$.subscribe((data) => {
      console.log('Received drawing data:', data); // Debugging line

      // Check the type of data received
      if (data && data.type === 'draw') {
        // Handle drawing data
        this.drawingData = data;
        this.drawPoint(data.x, data.y);
      } else if (data && data.type === 'end') {
        // Handle the end of drawing (clear the canvas or perform other actions)
        // You can add code here to handle the end of drawing
      } else if (data && data.type === 'clear') {
        // Handle clearing the canvas
        this.clearCanvas();
      }
    });
  }

  // Function to draw a point on the canvas
  private drawPoint(x: number, y: number) {
    console.log('Drawing point:', x, y); // Debugging line

    // Draw a line to the specified point
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  // Function to clear the canvas
  private clearCanvas() {
    // Clear the canvas by filling it with the background color
    this.ctx.fillStyle = 'aquamarine';
    this.ctx.fillRect(0, 0, this.viewerCanvas.nativeElement.width, this.viewerCanvas.nativeElement.height);
  }
}
