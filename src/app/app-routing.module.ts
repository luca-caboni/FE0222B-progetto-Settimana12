import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
