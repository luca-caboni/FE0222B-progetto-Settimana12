import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Favourite } from 'src/app/models/favourite';
import {  take } from 'rxjs/operators';
import { AuthData } from '../models/auth';
import { AuthService } from './auth.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {


  movies: Movie[] | undefined;
  favourites: Movie[] | undefined;
  liked: boolean = false;
  favouritesCounter = 0;


  constructor(private http: HttpClient, private authSrv: AuthService) {}

  async getMovies(): Promise<void> {
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    const movies = await lastValueFrom(this.http
      .get<Movie[]>('http://localhost:4201/api/movies-popular'))
    this.movies = movies;
    if (!this.favourites) {
      this.getFavourite();
    }
  }

  async addFavorite(movie: Movie) {
    this.favouritesCounter++;
    movie.like = true;
    let count = 0;
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    const data: Favourite = {
      movieId: movie.id,
      userId: user.user.id,
      id: count++,
    };
    return this.http.post<Favourite>(
      'http://localhost:4201/api/favourites',
      data
    );
  }

  async getFavourite(): Promise<void> {
    this.favourites = [];
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    this.http
      .get<Favourite[]>(
        `http://localhost:4201/api/favourites?userId=${user.user.id}`
      )
      .subscribe(async (res) => {
        await this.getMovies();
        for (let i of res) {
          for (let j of this.movies!) {
            if (i.movieId == j.id) {
              this.favourites!.push(j);
              this.favourites![this.favourites!.indexOf(j)].idFavourite =
                i.id;
              j.like = true;
            }
          }
        }
      });
  }

  async removeFavourite(movie: Movie) {
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    movie.like = false;
    this.http
      .delete(`http://localhost:4201/api/favourites/${movie.idFavourite}`)
      .subscribe();
  }

  private getErrorMess(status: number) {
    let mess = '';
    switch (status) {
      case 404:
        mess = 'Errore nella chiamata al server';
        break;
      default:
        mess = 'Errore nella connessione';
        break;
    }
    return mess;
  }
}
