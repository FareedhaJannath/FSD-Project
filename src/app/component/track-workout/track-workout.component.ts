import { Component, OnInit } from '@angular/core';
import { DateUtil } from '../utils/date-util';
import { ChartData } from '../chart/chart-data';
import { WorkoutService } from "../../services/workout.service";
import { Http , Response} from '@angular/http'; 
import {DailyWorkoutPlan } from "../../services/model";

@Component({
  selector: 'app-track-workout',
  templateUrl: './track-workout.component.html',
  styleUrls: ['./track-workout.component.css']
})
export class TrackWorkoutComponent implements OnInit {



  workoutEntries: Array<any>;
  dayWorkoutTime: number;
  weekWorkoutTime: number;
  monthWorkoutTime: number;
  weekChartData: ChartData;
  monthChartData: ChartData;
  yearChartData: ChartData
  dailyWorkouts:Array<DailyWorkoutPlan>;

  ngOnInit() {
  }
  constructor(private workoutService: WorkoutService) {
    //this.workoutEntries = this.workoutService.getDailyWorkouts();
   this.workoutService.getDailyWorkouts()
   .subscribe(
         (res) =>{
                  //console.log(res);
                   this.dailyWorkouts = res;
                   console.log(this.dailyWorkouts);
                   this.workoutEntries = this.dailyWorkouts;
                   this.calculateWorkoutTime();
          }
      );
  /* responseData.subscribe((data)=> 
     data.forEach(dailyWorkout =>{this.workoutEntries.push(dailyWorkout)}));*/
    
  }

  calculateWorkoutTime(): void {
    // calculate day workout time
    this.calculateDayWorkout();

    // calculate week workout time
    this.calculateWeekWorkout();

    // calculate month workout time
    this.calculateMonthWorkout();

    this.prepareWeekChartData();
    this.prepareMonthChartData();
    this.prepareYearChartData();
  }

  /**
   * calculate day workout time in minutes
   */
  calculateDayWorkout(): void {
    const today = DateUtil.getCurrentDate();
    this.dayWorkoutTime = this.workoutEntries.reduce((total, workoutEntry) => {
      if (workoutEntry.startDate === today) {
        total += DateUtil.getTimeDiffInMinute(workoutEntry.endTime, workoutEntry.startTime);
      }
      return total;
    }, 0);
  }

  /**
   * calculate week workout time in minutes
   */
  calculateWeekWorkout(): void {
    const now = new Date();
    const monday = DateUtil.getMonday(now);
    const sunday = DateUtil.getSunday(now);

    this.weekWorkoutTime = 0;

    this.weekWorkoutTime = this.workoutEntries.reduce((total, workoutEntry) => {
      let workoutStartDate = new Date(workoutEntry.startDate);
      let workoutEndDate = new Date(workoutEntry.endDate);
      if (workoutStartDate >= monday && workoutStartDate <= sunday) {
        total += DateUtil.getDiffInMinutes(workoutEntry.endDate, workoutEntry.startDate, workoutEntry.endTime, workoutEntry.startTime);
      }
      return total;
    }, this.weekWorkoutTime);
  }

  /**
   * calculate last month workout time in minutes
   */
  calculateMonthWorkout(): void {
    const currentMonth = DateUtil.getCurrentMonth();
    this.monthWorkoutTime = this.workoutEntries.reduce((total, workoutEntry) => {
      if (workoutEntry.startDate.split('-')[1] === currentMonth) {
        total += DateUtil.getDiffInMinutes(workoutEntry.endDate, workoutEntry.startDate, workoutEntry.endTime, workoutEntry.startTime);
      }
      return total;
    }, 0);
  }

  prepareWeekChartData(): void {
    let caloriesBurnt = 120;
    this.weekChartData = {
      id: 'weekChart',
      label: 'weekly',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [10, 20, 30, 20, 10, 20, 10],
      height: 200,
      width: 400
    };

    const now = new Date();
    const startDate = DateUtil.getMonday(now);

    for (let i = 0; i < 7; i++) {
      let date = DateUtil.formatDate(startDate); 
      this.workoutEntries.forEach(dailyWorkout => {
        if(dailyWorkout.startDate === date){
          caloriesBurnt += (DateUtil.getTimeDiffInMinute(dailyWorkout.endTime, dailyWorkout.startTime ) *dailyWorkout. workout.caloriesBurnt);
          this.weekChartData.data[i] += (DateUtil.getTimeDiffInMinute(dailyWorkout.endTime, dailyWorkout.startTime ) * dailyWorkout.workout.caloriesBurnt);
        }
      });
      startDate.setDate(startDate.getDate() + 1);
    }
    this.weekChartData.label = 'Week Total Calories Burnt: ' + caloriesBurnt.toFixed(2);
  }

  prepareMonthChartData(): void {
    let caloriesBurnt = 900;
    this.monthChartData = {
      id: 'monthChart',
      label: '',
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      data: [50, 100, 230, 120, 400],
      height: 200,
      width: 400
    };

    const now = new Date();
    const weeks = DateUtil.getWeeksStartAndEndInMonth(now.getMonth(), now.getFullYear(), 'monday');

    for (let i = 0; i < weeks.length; i++) {
      const startDate = weeks[i].start;
      const endDate = weeks[i].end;
      this.workoutEntries.forEach(dailyWorkout => {
        const workoutStartDate = parseInt(dailyWorkout.startDate.split('-')[2]);
        if( workoutStartDate >= startDate && workoutStartDate <= endDate){
          caloriesBurnt += (DateUtil.getTimeDiffInMinute(dailyWorkout.endTime, dailyWorkout.startTime ) * dailyWorkout.workout.caloriesBurnt);
          this.monthChartData.data[i] += (DateUtil.getTimeDiffInMinute(dailyWorkout.endTime, dailyWorkout.startTime ) * dailyWorkout.workout.caloriesBurnt);;
        }
      });
    }
    this.monthChartData.label = 'Month Total Calories Burnt: ' + caloriesBurnt.toFixed(2);
  }

  prepareYearChartData(): void {
    let caloriesBurnt = 8200;
    this.yearChartData = {
      id: 'yearChart',
      label: '',
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      data: [900, 1000, 800, 600, 300, 900, 650, 800, 200, 350, 900, 1000],
      height: 200,
      width: 400
    };

    for (let i = 1; i <= 12; i++) {
      let month = ("0" + i).slice(-2);
      this.workoutEntries.forEach(dailyWorkout => {
        if(dailyWorkout.startDate.split('-')[1] === month){
          caloriesBurnt += (DateUtil.getTimeDiffInMinute(dailyWorkout.endTime, dailyWorkout.startTime ) * dailyWorkout.workout.caloriesBurnt);
          this.yearChartData.data[i-1] += (DateUtil.getTimeDiffInMinute(dailyWorkout.endTime, dailyWorkout.startTime ) * dailyWorkout.workout.caloriesBurnt);
        }
      });
    }
    this.yearChartData.label = 'Year Total Calories Burnt: ' + caloriesBurnt.toFixed(2);
  }

}
