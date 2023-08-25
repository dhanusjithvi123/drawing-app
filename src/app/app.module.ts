import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawingComponent } from './drawing/drawing.component';
import { ViewerComponent } from './viewer/viewer.component';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DrawingComponent,
    ViewerComponent,
    TimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
