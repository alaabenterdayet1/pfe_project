import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponentComponent } from './events-component/events-component.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"events",
    pathMatch:"full"
  },
  {
    path:"events",
    component:EventsComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
