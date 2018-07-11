import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackWorkoutComponent } from './track-workout.component';

describe('TrackWorkoutComponent', () => {
  let component: TrackWorkoutComponent;
  let fixture: ComponentFixture<TrackWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackWorkoutComponent ]
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
