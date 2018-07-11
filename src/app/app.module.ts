import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DatePipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
 
import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ViewWorkoutComponent } from './component/view-workout/view-workout.component';
import { CreateWorkoutComponent } from './component/create-workout/create-workout.component';
import { TrackWorkoutComponent } from './component/track-workout/track-workout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routes';
import { CategoryComponent } from './component/category/category.component';
import { AlertComponent } from './component/alert/alert.component';
import { ModalComponent } from './component/modal/modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { WorkoutService } from './services/workout.service';
import { AlertService } from './component/alert/alert.service';
import { TimerComponent } from './component/timer/timer.component';
import {AppConstants} from './services/model';
import { BarChart } from './component/chart/bar-chart.component';

@NgModule({
  declarations: [
    AlertComponent,
    ModalComponent,
    AppComponent,
    NavBarComponent,
    ViewWorkoutComponent,
    CreateWorkoutComponent,
    TrackWorkoutComponent,
    CategoryComponent,
    TimerComponent,
    BarChart
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [WorkoutService,AlertService,DatePipe,AppConstants],
  bootstrap: [AppComponent]
})
export class AppModule { }
