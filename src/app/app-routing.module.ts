import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawingComponent } from './drawing/drawing.component';
import { ViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
  { path: '', component:DrawingComponent},
  { path: 'viewer', component:ViewerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
