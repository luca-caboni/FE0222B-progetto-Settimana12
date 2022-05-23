import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movies.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie';
import { Favourite } from '../../models/favourite';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {

  movies!: Movie[] | undefined;
  public favourites!: Favourite[];
  sub!: Subscription;

  constructor(private movieSrv: MovieService, private authSrv: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavourites();
  }


  getMovies(){
    this.movieSrv.getMovies().subscribe((data)=> {
      this.movies = data;
    })
  }

  getFavourites(){
    this.movieSrv.getUserFavourite(this.authSrv.getUserId()).subscribe((data)=> {
      this.favourites = data
    })
  }

  getFavoriteIdByMovie(movieId: number){
    for(let i=0; i<this.favourites.length; i++){
      if(this.favourites[i].movieId == movieId){
        return this.favourites[i].id
      }
    }
    return -1
  }

  findFavourites(movieId: number){
    for(let i=0; i<this.favourites.length; i++){
      if(this.favourites[i].movieId == movieId){
        return true
      }
    }
    return false;
  }


async liked(movieId: number){
    let userId = this.authSrv.getUserId();
    let fav: Favourite = {
      userId: userId,
      movieId: movieId,
      id: 0
    }

await this.movieSrv.addFavourite(fav).toPromise();
    this.getFavourites();
}

  async disliked(movieId: number){
    let favId: any = this.getFavoriteIdByMovie(movieId);
    this.movieSrv.removeFavourite(favId).subscribe(() => {
      for(let i=0; i<this.favourites.length; i++){
        if(this.favourites[i].movieId == movieId){
          this.favourites.splice(i, 1);
        }
      }
    });
  }
}



