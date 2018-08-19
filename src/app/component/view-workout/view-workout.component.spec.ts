import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkoutComponent } from './view-workout.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { AlertService } from '../alert/alert.service';
import { WorkoutService } from "../../services/workout.service";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {TimerComponent} from '../timer/timer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Http , Response} from '@angular/http'; 
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";
import {DatePipe} from '@angular/common';
import { AppConstants } from "../../services/model";

describe('ViewWorkoutComponent', () => {
  let component: ViewWorkoutComponent;
  let fixture: ComponentFixture<ViewWorkoutComponent>;
  /*let res:Response;
  let mockWorkoutService = {

     getWorkouts() : void {
     }
  }
  let mockAlertService = {

     getWorkouts() : void {
     }
  }*/
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWorkoutComponent,TimerComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpModule, RouterTestingModule,  FormsModule,Ng2SearchPipeModule  ],
       providers: [ WorkoutService,AlertService,FormBuilder,DatePipe,AppConstants]
 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
