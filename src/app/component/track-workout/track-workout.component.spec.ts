import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackWorkoutComponent } from './track-workout.component';
import { BarChart } from '../chart/bar-chart.component';
import { RouterTestingModule } from '@angular/router/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Http , Response} from '@angular/http'; 
import { WorkoutService } from "../../services/workout.service";
import { Category,DailyWorkoutPlan } from "../../services/model";
import { Observable } from 'rxjs';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
import { AlertService } from '../alert/alert.service';
import { AppConstants } from "../../services/model";

describe('TrackWorkoutComponent', () => {
  let component: TrackWorkoutComponent;
  let fixture: ComponentFixture<TrackWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackWorkoutComponent,BarChart ],
       schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule,FormsModule, HttpModule ],
      providers: [WorkoutService,AlertService,AppConstants] ,
    })
    .compileComponents();
  }));

  

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
