import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Route[] = [
  {
    path: 'movies',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/movies/movies.module').then(
        (m) => m.MoviesModule
      )
  },

  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule)
  }]

  @NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports:[RouterModule]
  })
  export class AppRoutingModule { }


