import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute, Router,Params } from "@angular/router";
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";
import { WorkoutService } from "../../services/workout.service";

import { Category,WorkOut } from "../../services/model";
import { Http , Response} from '@angular/http'; 
import { AlertService } from "../alert/alert.service";

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css']
})
export class CreateWorkoutComponent implements OnInit {

  workoutForm: FormGroup;
  categories: Category[]=[];
  category: Category;
  submitted: boolean;
  editedId: number =0;
  edited: boolean;
  workout: WorkOut;
  response:any;
  status : any;
  message: any;
  formHeader:string;
  constructor(public route: ActivatedRoute,
        public router: Router,
        public workoutService: WorkoutService,
        public alertService:AlertService,
        public formBuilder: FormBuilder) { 
          
         
           // subscribe to router event
  
         this.workoutService.getCategories().subscribe((data)=> 
            data.forEach(category =>{this.categories.push(category)}));
            
      
    }

  ngOnInit() {
      this.route.params.subscribe((params: Params) => {
            this.editedId = +params['workoutId']; 
        });
        if(this.editedId>0) {
               this.getWorkoutById(this.editedId);
               this.formHeader = "Edit Workout";
            }else{
              this.formHeader = "Add Workout";
              this.workout = new WorkOut(0,null,null,null,null,null);
              this.createForm();
            }
     if(this.editedId>=0){
        this.edited=true;
     }else{
      
       this.edited=false;
     }

  }
  getWorkoutById(editedId:number){
     let workout:WorkOut = new WorkOut(editedId,null,null,null,null,null);
     
    this.workoutService.getWorkout(workout)
    .subscribe(
        (res:Response) =>{
              this.message =res['message'];
              this.status = res['success'];
              this.workout = res['workout'];
              this.category = this.workout.category;
              this.workout.categoryId = this.category.categoryId;
              console.log(this.workout);
              if(this.status){
              this.createEditedForm();
              }
            }
     );

  }

  createForm(){
         this.workoutForm = new FormGroup({
            workoutTitle: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
            workoutNote: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
            caloriesBurnt: new FormControl(0, [<any>Validators.required, Validators.min(0.1)]),
            categoryId:new FormControl('', [<any>Validators.required, <any>Validators.minLength(3)])
    });
  }

 createEditedForm() {
   console.log('edit workout form');
  // console.log(this.workout.workoutTitle);
   this.workoutForm = new FormGroup({
            workoutTitle: new FormControl(this.workout.workoutTitle, [<any>Validators.required, <any>Validators.minLength(5)]),
            workoutNote: new FormControl(this.workout.workoutNote, [<any>Validators.required, <any>Validators.minLength(5)]),
            caloriesBurnt: new FormControl(this.workout.caloriesBurnt, [<any>Validators.required, Validators.min(0.1)]),
            categoryId:new FormControl(this.workout.categoryId, [<any>Validators.required, <any>Validators.minLength(3)])
    });
   // console.log(this.workout.category);
  }

  addCategory() : void{ 
     this.router.navigate(['workout/category']);
   }

    incrementCalories(): void {
    const calories = parseFloat(this.workoutForm.controls['caloriesBurnt'].value) + 0.1;
    this.workoutForm.controls['caloriesBurnt'].setValue(calories.toFixed(1));
  }

  decrementCalories(): void {
    const calories = parseFloat(this.workoutForm.controls['caloriesBurnt'].value) - 0.1;
    if(calories >= 0.0) {
      this.workoutForm.controls['caloriesBurnt'].setValue(calories.toFixed(1));
    }
    
  }

  saveWorkout(workout: WorkOut, isValid: boolean){
     this.submitted = true; 
   // console.log(workout);
    if(isValid) {
      // this.workout.workoutId=0;
      let newWorkout = new WorkOut(0,workout.workoutTitle,
               workout.workoutNote,workout.caloriesBurnt,
               workout.categoryId,null);
      this.workoutService.saveWorkout(newWorkout).subscribe(
            (res:Response) =>{
              // console.log(res);
              this.message =res['message'];
              this.status = res['success'];
             if(this.status){ 
                this.alertService.addAlert('Workout Added successfully..!!', 'success');
                this.workoutForm.reset();
                this.submitted = false; 
              } 
            }
        );
        console.log(this.status);
        
      }else {
        // invalid
      }
  }

  updateWorkout(workout: WorkOut, isValid: boolean,idx:number){
     this.submitted = true; 
 
    if(isValid) {
      workout.caloriesBurnt = this.workout.caloriesBurnt;
     // workout.workoutTitle=this.workout.workoutTitle;
      workout.workoutId = idx;
      console.log(workout);
      this.workoutService.saveWorkout(workout).subscribe(
         (res:Response) =>{
                  this.message =res['message'];
                  this.status = res['success'];
                   if(this.status) {
                    this.alertService.addAlert('Workout Updated successfully..!!', 'success');
                    this.workoutForm.reset();
                    this.submitted = false; 
                  } 
          }
      );
      console.log(this.status);
     
      }else {
        // invalid
      }
    
  }

  
  }

