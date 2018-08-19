import { async, inject,ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { Category } from "../../services/model";
import { Observable} from 'rxjs';
import { HttpModule,ResponseOptions } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { AlertService } from '../alert/alert.service';
import { WorkoutService } from "../../services/workout.service";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Http , Response} from '@angular/http'; 
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";
import { By } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
 

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  

  let mockAlertService = {
       
   
  }
 
  const mockCategoryList: Category[] = [
    {
      categoryId: 1,
      categoryTitle: "Category 1",
      editable:false,
       searchCategory(): string {
        return  this.categoryTitle;
    }
    },
    {
      categoryId: 2,
      categoryTitle: "Category 2",
      editable:false,
       searchCategory(): string {
        return  this.categoryTitle;
    }
    },
    {
      categoryId: 3,
      categoryTitle: "Category 3",
      editable:false,
       searchCategory(): string {
        return  this.categoryTitle;
    }
    },
  
  ]; 
 const mockAddCategoryList: Category[] = [
    {
      categoryId: 1,
      categoryTitle: "Category 1",
      editable:false,
       searchCategory(): string {
        return  this.categoryTitle;
    }
    },
    {
      categoryId: 2,
      categoryTitle: "Category 2",
      editable:false,
       searchCategory(): string {
        return  this.categoryTitle;
    }
    },
    {
      categoryId: 3,
      categoryTitle: "Category 3",
      editable:false,
       searchCategory(): string {
        return  this.categoryTitle;
    }
    },
   {
      categoryId: 4,
      categoryTitle: "Category 4",
      editable:false,
       searchCategory(): string {
        return  this.categoryTitle;
    }
    },
  ]; 

  /*let mockResponseObj =[
    {
      message:"Category Saved Successfully!!",
      success:true,
      categories:this.mockCategoryList
    }
  ];
  */

   const  addResponseMock = [ 
     {
        message: "Category Saved Successfully!!", 
        success:true,
         categories: this.mockAddCategoryList
      }
   ];
  let mockResponse = new Response(new ResponseOptions({ body: addResponseMock, status: 200 }));

  let res:Response;

  let mockCategoryService = {

    getCategories(): Observable<Category[]> {
      return Observable.of(mockCategoryList);
    },
    addCategory(categoryData: Category): Observable<Response> {
      mockCategoryList.unshift(categoryData);
       
      return Observable.of(mockResponse);
    },
    updateCategory(categoryData: Category): Observable<Response> {
      mockCategoryList.unshift(categoryData);
      
      return Observable.of(res);
    },
    deleteCategory(categoryId: number): Observable<Response> {
      let categoryObj: Category = mockCategoryList.find(x => x.categoryId == categoryId);
      let index = mockCategoryList.indexOf(categoryObj);
      mockCategoryList.splice(index, 1);
      //res["categories"]=mockCategoryList;
      return Observable.of(res);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpModule, RouterTestingModule,  ReactiveFormsModule,FormsModule,Ng2SearchPipeModule],
      providers: [{provide: WorkoutService, useValue: mockCategoryService},
      {provide: AlertService, useValue: mockAlertService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should get all the categories', () => {
    component.ngOnInit();
    expect(component.categoryList).toEqual(mockCategoryList);
  });

  it('it should render the category list', () => {
    const element = fixture.nativeElement;
    component.categoryList=mockCategoryList;
    fixture.detectChanges();
    expect(element.querySelectorAll('div.workoutRow').length).toBe(3);
  });

  it('it should add new category', async(inject([WorkoutService], (categoryService: WorkoutService) => {
    const element = fixture.nativeElement;
    element.querySelector('#category-title').value = "Category 4";
    fixture.detectChanges();
    expect(element.querySelector('#category-title').value).toEqual("Category 4");
    let buttonClick = fixture.debugElement.query(By.css('#addButton')).nativeElement.click();
    fixture.detectChanges();
    let newCategory: Category = {
      categoryId: 0,
      categoryTitle: "Category 4",
      editable:false,
       searchCategory(): string {
        return  this.categoryTitle;
    }
    };
    let res: Category = new Category(null,null,false);
    fixture.detectChanges();
    categoryService.addCategory(newCategory).subscribe(  
     (res:Response) =>{
      // component.categoryList =res["categories"];
    });
    fixture.detectChanges();
    expect(component.categoryList).toEqual(mockAddCategoryList);
    expect(element.querySelectorAll('div.workoutRow').length).toBe(4);
  })));

  it('it should delete category', async(inject([WorkoutService], (categoryService: WorkoutService) => {
    const element = fixture.nativeElement;
    let responseData: boolean;
    let deleteCategory: Category = {
      categoryId: 2,
      categoryTitle: "Category 2",
      editable:false,
       searchCategory(): string {
        return  this.categoryTitle;
    }
    };
    categoryService.deleteCategory(deleteCategory).subscribe( 
     (res:Response) =>{
       //component.categoryList =res["categories"];
    });
    fixture.detectChanges();
    expect(component.categoryList).toEqual(mockCategoryList);
    expect((element.querySelectorAll('div.workoutRow').length) -1 ).toBe(4);
  })));



});