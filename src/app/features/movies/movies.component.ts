import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movies.service'
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies = this.movieSrv.movies;

  constructor(private movieSrv: MovieService, private http: HttpClient) { }

  ngOnInit(): void {
    setInterval(() => {
      this.movies = this.movieSrv.movies;
    }, 20);
    if (!this.movies) {
      this.movieSrv.getMovies();
    }
  }

  async like(movie: Movie) {
    await (await (this.movieSrv.addFavorite(movie))).toPromise();
  }

  unlike(movie: Movie) {
    this.movieSrv.removeFavourite(movie);
  }
}
