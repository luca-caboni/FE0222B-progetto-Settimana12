import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movies.service'
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies!: Movie[] | undefined;
  sub!: Subscription;

  constructor(private movieSrv: MovieService, private http: HttpClient) { }

  ngOnInit(): void {
      this.sub = this.movieSrv.getMovies().subscribe(movies => this.movies = movies);
    }
  }
