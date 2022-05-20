import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from '../movies/movies.component'
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '', component: MoviesComponent
  }
];


@NgModule({
  declarations: [MoviesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})

export class MoviesModule { }
