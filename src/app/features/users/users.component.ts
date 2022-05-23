import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movies.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import {Favourite} from '../../models/favourite'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  constructor(private movieSrv: MovieService, private authSrv: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  userName(){
    let loggedUser = this.authSrv.getUserInfo();
    if(loggedUser != undefined){
      return loggedUser['name'];
    }
    return;
  }

  userEmail(){
    let loggedUser = this.authSrv.getUserInfo();
    if(loggedUser != undefined){
      return loggedUser['email'];
    }
    return;
  }}
