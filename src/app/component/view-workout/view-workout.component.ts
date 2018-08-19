import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import {DatePipe} from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";

import { WorkOut, DailyWorkoutPlan } from "../../services/model";
import { WorkoutService } from "../../services/workout.service";
import { AlertService } from "../alert/alert.service";
import {TimerComponent} from '../timer/timer.component';
import { Http , Response} from '@angular/http'; 

@Component({
  selector: 'app-view-workout',
  templateUrl: './view-workout.component.html',
  styleUrls: ['./view-workout.component.css']
})
export class ViewWorkoutComponent implements OnInit {

    workouts: Array<WorkOut>;
    date: Date;
    timeComp: TimerComponent;
    showStartDailyWorkout:boolean;
    dailyWorkout:DailyWorkoutPlan;
    dailyWorkouts:Array<DailyWorkoutPlan>;
    comment:string;
    startDate:string;
    endDate:string;
    startTime:string;
    endTime:string;
    response:any;
    status : any;
    message: any;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public workoutService: WorkoutService,
        public formBuilder: FormBuilder,
        public alertService: AlertService,
        public datePipe:DatePipe
         ) { 
        this.getWorkouts();
        this.showStartDailyWorkout=false;
        this.comment='';
        this.startDate=this.datePipe.transform(new Date(),'dd-MM-yyyy');
        this.endDate=this.datePipe.transform(new Date(),'dd-MM-yyyy');
        this.startTime=this.datePipe.transform(new Date(),'hh:mm:ss');
        this.endTime=this.datePipe.transform(new Date(),'hh:mm:ss');;
    }

    ngOnInit(): any {
     }
    
    getWorkouts() : void {
      //this.workouts  = this.workoutService.getWorkouts();
       this.workouts = new Array<WorkOut>();
       this.workoutService.getWorkouts().subscribe(data=> {
        data.forEach(workout =>{this.workouts.push(workout)})
       });
      //console.log(this.workouts);
    }
    
    deleteWorkout(workout:WorkOut): void {
     this.workoutService.deleteWorkout(workout)
        .subscribe(
                    (res:Response) =>{
                      this.message =res['message'];
                      this.status = res['success'];
                      this.workouts =res["workouts"];
                      if(this.status) {
                         this.alertService.addAlert('Workout deleted successfully..!!', 'success');
                      }else{
                        this.alertService.addAlert('Could not Delete Workout', 'error');
                      }
                    }
            );
        
         
  }

   getDailyWorkout(){
     this.dailyWorkouts = Array<DailyWorkoutPlan>();
      let responseData = this.workoutService.getDailyWorkouts();
    
        responseData.subscribe((data)=> 
        data.forEach(workout =>{this.dailyWorkouts.push(workout)}));
        console.log(this.dailyWorkouts);
   }

    startDailyWorkout(workout:WorkOut){
     // this.dailyWorkout.workoutId=this.workouts[idx].workoutId;
     this.dailyWorkout = {comment:this.comment,
                          startDate:this.startDate,
                          endDate:this.endDate,
                          startTime:this.startTime,
                          endTime:this.endTime,
                          status:'Y',
                          dailyWorkoutId:0,
                          workout:null,
                          workoutId:workout.workoutId
                        };
      this.showStartDailyWorkout=true;
      //console.log(this.dailyWorkout);
    }

    stopWorkout(comment:string){
      this.dailyWorkout.comment =comment;
      this.dailyWorkout.endDate= this.datePipe.transform(new Date(),'dd-MM-yyyy');
      this.dailyWorkout.endTime = this.datePipe.transform(new Date(),'hh:mm:ss');
      this.showStartDailyWorkout=false;
      //console.log('stop..'+JSON.stringify(this.dailyWorkout));
        this.workoutService.saveDailyWorkout(this.dailyWorkout)
        .subscribe(
                    (res:Response) =>{
                      this.message =res['message'];
                      this.status = res['success'];
                      this.workouts =res["workouts"];
                      this.dailyWorkouts = res["dailyWorkouts"];
                      if(this.status) {
                         this.alertService.addAlert('Daily Workout saved successfully..!!', 'success');
                      }
                    }
            );
        this.comment='';
        this.startDate=this.datePipe.transform(new Date(),'dd-MM-yyyy');
        this.endDate=this.datePipe.transform(new Date(),'dd-MM-yyyy');
        this.startTime=this.datePipe.transform(new Date(),'hh:mm:ss');
        this.endTime=this.datePipe.transform(new Date(),'hh:mm:ss');
    }

    cancelWorkout(){
        this.showStartDailyWorkout=false;
        this.comment='';
       this.comment='';
        this.startDate=this.datePipe.transform(new Date(),'dd-MM-yyyy');
        this.endDate=this.datePipe.transform(new Date(),'dd-MM-yyyy');
        this.startTime=this.datePipe.transform(new Date(),'hh:mm:ss');
        this.endTime=this.datePipe.transform(new Date(),'hh:mm:ss');
    }

}
