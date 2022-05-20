import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { lastValueFrom } from 'rxjs'


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  errorMessage = undefined;
  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void { }

  async onsubmit(form: NgForm) {
    this.isLoading = true;
    console.log(form);
    try {
      await lastValueFrom(this.authSrv.signup(form.value));
      form.reset();
      this.isLoading = false;
      this.errorMessage = undefined;
      this.router.navigate(['/']);
    } catch (error: any) {
      this.isLoading = false;
      this.errorMessage = error;
      console.error(error);
    }
  }
}
