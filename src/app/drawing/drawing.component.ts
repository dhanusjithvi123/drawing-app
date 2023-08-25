import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;
  private drawing: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    const canvasElement = this.canvas.nativeElement;
    this.ctx = canvasElement?.getContext('2d');

    if (this.ctx) {
      this.ctx.lineJoin = 'round';
      this.ctx.lineCap = 'round';
      this.ctx.lineWidth = 2;
    } else {
      console.error('Canvas context is not supported.');
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.drawing = true;
    this.lastX = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left;
    this.lastY = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top;
    this.ctx?.beginPath();
    this.ctx?.moveTo(this.lastX, this.lastY);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.drawing) return;
    const currentX = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left;
    const currentY = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top;

    this.ctx?.lineTo(currentX, currentY);
    this.ctx?.stroke();
    this.lastX = currentX;
    this.lastY = currentY;
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.drawing = false;
    this.ctx?.closePath();
  }

  sendDrawingData() {
    // Check if drawing is in progress
    if (this.drawing) {
      // Send the current drawing data to the server
      const drawingData = { type: 'draw', x: this.lastX, y: this.lastY };
      this.socketService.sendDrawingData(drawingData);
    } else {
      // Inform the server that the drawing has ended
      this.socketService.sendDrawingData({ type: 'end' });
    }
  }
}
