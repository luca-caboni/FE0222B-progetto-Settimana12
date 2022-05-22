import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    canActivate:[AuthGuard],
    path: '',
    component: UsersComponent
  }

];

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class FavouritesModule {}
