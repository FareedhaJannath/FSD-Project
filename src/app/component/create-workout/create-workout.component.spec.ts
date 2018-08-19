import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateWorkoutComponent } from './create-workout.component';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Http , Response} from '@angular/http'; 
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing'
import { AlertService } from '../alert/alert.service';
import { WorkoutService } from "../../services/workout.service";
import { Category } from "../../services/model";
import { Observable } from 'rxjs';

describe('CreateWorkoutComponent', () => {
  let component: CreateWorkoutComponent;
  let fixture: ComponentFixture<CreateWorkoutComponent>;
  
  let res:Response;
  let mockService = {
   getCategories(): Observable<Category[]> {
      return Observable.of(mockCategoryList);
    }
    
  }
  const mockCategoryList: Category[] = [
    {
      categoryId: 1,
      categoryTitle: "Category 1",
      editable:false,
       searchCategory(): string {
        return  this.categoryTitle;
    }
    }];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkoutComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpModule, RouterTestingModule, ReactiveFormsModule,  FormsModule],
       providers: [{provide: WorkoutService, useValue: mockService},
      {provide: AlertService, useValue: mockService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
