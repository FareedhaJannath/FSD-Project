import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions} from '@angular/http';
import { LocalStorage } from './local-storage';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; 

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/toPromise';

import { DailyWorkoutPlan, WorkOut, Category, AppConstants } from './model';
const SUCCESS = true;
const ERROR = false;

@Injectable()
export class WorkoutService{
    viewWorkouts: Array<DailyWorkoutPlan> = [];
    workouts: Array<WorkOut> = [];
    categories: Array<Category> =[];
    headers = new Headers({'Content-Type':'application/json;charset=UTF-8'})
    options = new RequestOptions({ headers: this.headers });
    constructor(public http: Http,private constants: AppConstants) {
 
    }

   
    getCategories() :Observable<Category[]> {
          let res= this.http.get(this.constants.baseAppUrl+"getCategories").map((res) =>res.json()['categories']);
          console.log(res);
          return res;
    }

 
    updateCategory(category: Category):Observable<Response> {
        let url =this.constants.baseAppUrl+"saveCategory";
        let body =JSON.stringify(category);
        return this.http.post(url, body,this.options).map((res:Response) => res.json());
    }

      deleteCategory(category: Category) :Observable<Response> {
          console.log('delete..category..'+category.categoryId);
         let url =this.constants.baseAppUrl+"deleteCategory/"+category.categoryId;
        let body =JSON.stringify(category);
        return this.http.put(url, this.options).map((res:Response) => res.json());
    }

    addCategory(category: Category) :Observable<Response>{
        let url =this.constants.baseAppUrl+"saveCategory";
        let body =JSON.stringify(category);
        return this.http.post(url, body,this.options).map((res:Response) => res.json());
        
    }

     getWorkouts(): Observable<WorkOut[]> {
             
         let res= this.http.get(this.constants.baseAppUrl+"getWorkouts").map((res) =>res.json()['workouts']);
          console.log(res);
          return res;
    }

    deleteWorkout(workout:WorkOut): Observable<Response> {
   
        let url =this.constants.baseAppUrl+"deleteWorkout/"+workout.workoutId;
        let body =JSON.stringify(workout);
        return this.http.put(url, this.options).map((res:Response) => res.json());
    }
     saveWorkout(workout: WorkOut): Observable<Response> {
       let url =this.constants.baseAppUrl+"saveWorkout";
        let body =JSON.stringify(workout);
        return this.http.post(url, body,this.options).map((res:Response) => res.json());
    }
    /* updateWorkout(workout: WorkOut, idx: number): boolean {
        let workouts = this.getWorkouts();
        workouts[idx] = workout;
        localStorage.setItem('workouts', JSON.stringify(workouts));
        return SUCCESS;
    }*/
    getWorkout(workout:WorkOut): Observable<Response>{
        //console.log('In get workout..'+workout.workoutId);
        let url =this.constants.baseAppUrl+"getWorkout/"+workout.workoutId;
        let body=JSON.stringify(workout);
        return this.http.get(url,this.options).map((res:Response) =>res.json());      
    }

    getDailyWorkouts(): Observable<DailyWorkoutPlan[]> {
          let res= this.http.get(this.constants.baseAppUrl+"getDailyWorkouts").map((res) =>res.json()['dailyWorkouts']);
          console.log(res);
          return res;
    }

    saveDailyWorkout(dailyWorkout: DailyWorkoutPlan): Observable<Response> {
        let url =this.constants.baseAppUrl+"saveDailyWorkout";
        let body =JSON.stringify(dailyWorkout);
        return this.http.post(url, body,this.options).map((res:Response) => res.json());
       /* let dailyWorkouts = this.getDailyWorkouts();
        dailyWorkouts.push(dailyWorkout);
        localStorage.setItem('dailyWorkouts', JSON.stringify(dailyWorkouts));*/
    }

    updateDailyWorkout(workoutEntry: DailyWorkoutPlan): void {
        /*let dailyWorkouts = this.getDailyWorkouts();
        let index = dailyWorkouts.findIndex(existingDailyWorkout => {
           return existingDailyWorkout.workoutId === workoutEntry.workoutId
            && existingDailyWorkout.startDate === workoutEntry.startDate
            && existingDailyWorkout.startTime === workoutEntry.startTime
        });

        if(index >= 0) {
            dailyWorkouts[index] = workoutEntry;
            localStorage.setItem('dailyWorkouts', JSON.stringify(dailyWorkouts));
        }*/
    }

     handleError(error: Response) {
        console.log(error);
        return Observable.throw(error || 'Server error');
    }
}
