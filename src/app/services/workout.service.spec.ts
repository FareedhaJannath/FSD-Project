import { TestBed, inject } from '@angular/core/testing';

import { WorkoutService } from 'app/services/workout.service';

describe('WorkoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutService]
    });
  });

  it('should be created', inject([WorkoutService], (service: WorkoutService) => {
    expect(service).toBeTruthy();
  }));
});
