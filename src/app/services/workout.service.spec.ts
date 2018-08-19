import { TestBed, inject } from '@angular/core/testing';

import { WorkoutService } from "./workout.service";
import { HttpModule } from '@angular/http';
import { AppConstants } from './model';

describe('WorkoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutService,AppConstants],
       imports: [HttpModule]
    });
  });

  it('should be created', inject([WorkoutService], (service: WorkoutService) => {
    expect(service).toBeTruthy();
  }));
});
