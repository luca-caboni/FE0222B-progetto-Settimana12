import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from '../movies/movies.component'
import { AuthGuard } from 'src/app/auth/auth.guard';
import {MatIcon, MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '', component: MoviesComponent
  }
];


@NgModule({
  declarations: [MoviesComponent],
  imports: [CommonModule,  MatIconModule, RouterModule.forChild(routes)]
})

export class MoviesModule { }
