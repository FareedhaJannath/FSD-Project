import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewWorkoutComponent } from './component/view-workout/view-workout.component';
import { TrackWorkoutComponent } from './component/track-workout/track-workout.component';
import { CategoryComponent } from './component/category/category.component';
import { CreateWorkoutComponent } from './component/create-workout/create-workout.component';

export const routes: Routes = [
    { path: 'workout', component: ViewWorkoutComponent },
    { path: 'workout/create', component: CreateWorkoutComponent },
    { path: 'workout/edit/:workoutId', component: CreateWorkoutComponent },
    { path: 'workout/category', component: CategoryComponent },
    { path: 'workout/track', component: TrackWorkoutComponent },
    { path: '**', redirectTo: '/workout' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);