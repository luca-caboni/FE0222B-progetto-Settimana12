import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Favourite } from 'src/app/models/favourite';
import { AuthService } from './auth.service';
import { Observable} from 'rxjs/';

@Injectable({
  providedIn: 'root',
})
export class MovieService {


  movies: Movie[] | undefined;
  favouritesCounter = 0;
  baseURL = 'http://localhost:4201';


  constructor(private http: HttpClient, private authSrv: AuthService) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseURL}/movies-popular`)
  }

  addFavourite(data: Favourite) {
    this.favouritesCounter++;
    return this.http.post(`${this.baseURL}/favorites`, data)
  }

  removeFavourite(favouriteId: Favourite) {
    this.favouritesCounter--;
    return this.http.delete(`${this.baseURL}/favorites/${favouriteId}`)
  }

  getUserFavourite(userId: number) {
    return this.http.get<Favourite[]>(`${this.baseURL}/favorites?userId=${userId}`)
  }

  getMovieById(movieId: number) {
    return this.http.get<Movie>(`${this.baseURL}/movies-popular/${movieId}`)
  }

}
