import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  errorMessage = undefined;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onsubmit(form: any) {
    console.log(form);

    try {
      await lastValueFrom(this.authSrv.login(form.value));
      form.reset();
      this.errorMessage = undefined;
      this.router.navigate(['/movies']);
    } catch (error: any) {
      this.errorMessage = error;
      console.error(error);
    }
  }
}

