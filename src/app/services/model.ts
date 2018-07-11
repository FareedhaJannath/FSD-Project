import { Injectable } from "@angular/core";

@Injectable()
export class AppConstants{
     readonly baseAppUrl: string = 'http://localhost:8080/';
}

@Injectable()
export class DailyWorkoutPlan {
    
    constructor(
        public comment:string,
        public startDate:string,
        public endDate:string,
        public startTime:string,
        public endTime:string,
        public status:string,
        public workoutId:number,
        public workout:WorkOut[],
        public dailyWorkoutId:number) {
    }

  /*  totalWorkoutDuration(): number {
        if (!this.exercises) return 0;

        let total = this.exercises.map((e) => e.duration).reduce((previous, current) => parseInt(previous) + parseInt(current));

        return  total;
    }*/
}

@Injectable()
export class Category {
    constructor(
        public categoryId:number,
        public categoryTitle: string,
        public editable:boolean) {
    }

    searchCategory(): string {
        return  this.categoryTitle;
    }
}


export class WorkOut {

    constructor(
        public workoutId: number,
        public workoutTitle: string,
        public workoutNote: string,
        public caloriesBurnt: number,
        public categoryId:number,
        public category: Category
    ){}
       
}
