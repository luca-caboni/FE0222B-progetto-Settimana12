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
    path: 'favourites',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/favourites/favourites.module').then((m) => m.FavouritesModule)
  }]

  @NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports:[RouterModule]
  })
  export class AppRoutingModule { }


