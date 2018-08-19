import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";

import { Category } from "../../services/model";
import { AlertService } from '../alert/alert.service';
import { WorkoutService } from "../../services/workout.service";
import { Http , Response} from '@angular/http'; 

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categoryText: string;
  categoryList: Category[]=[];
  category: Category;
  submitted: boolean = false;
  response:any;
  status : any;
  message: any;
  constructor(public route: ActivatedRoute,
        public router: Router,
        public workoutService: WorkoutService,
        public formBuilder: FormBuilder,
        private alertService: AlertService)
         { 
          this.getCategories();
        }

  ngOnInit() {
      this.categoryForm = new FormGroup({
        searchCategory: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
        title: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)])
    });


  }
   
    deleteCategory(deleteCategory:Category) {
  
       this.workoutService.deleteCategory(deleteCategory)
        .subscribe(
                    (res:Response) =>{
                      this.message =res['message'];
                      this.status = res['success'];
                      this.categoryList =res["categories"];

                        if(this.status) {
                           this.alertService.addAlert('Category deleted successfully..!!', 'success');
                        }
                    }
            );
       
              //this.alertService.addAlert('Category deleted successfully..!!', 'success');
     }

     editCategory(category){
       /* category.categoryTitle=title;
        category.editable=false;*/
        this.workoutService.updateCategory(category).subscribe(
                (res:Response) =>{
                  this.message =res['message'];
                  this.status = res['success'];
                  this.categoryList =res["categories"];

                  if(this.status) {
                     this.alertService.addAlert('Category Updated successfully..!!', 'success');
                   }
               }
        );
        
    }
   
   getCategories(): void {
    this.categoryList = new Array<Category>();
    
    let responseData = this.workoutService.getCategories();
    
    responseData.subscribe((data)=> 
     data.forEach(category =>{this.categoryList.push(category)}));
  }

  
   onAddClick(title: string) : void{
          let category = new Category(0,title, false);
          if(title && title.length>0) {
            this.workoutService.addCategory(category).subscribe(
                (res:Response) =>{
                  // console.log(res);
                  this.message =res['message'];
                  this.status = res['success'];
                  this.categoryList =res["categories"];
                   if(this.status){ 
                       this.alertService.addAlert('Category Added successfully..!!', 'success');
                    }
               }
            );
           
          }
          else
          {
            // invalid request
          }
          title='';
   }
   mapFormValues(form: FormGroup) {
        this.category.categoryTitle = form.controls['title'].value;
    }

  onSubmit(categoryForm: FormGroup) {
        this.submitted = true;
        if (!categoryForm.valid) return;
        this.mapFormValues(categoryForm);
       // this.exerciseBuilderService.save();
        //this.router.navigate(['/builder/exercises']);
    }
}
