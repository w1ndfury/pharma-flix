import { Injectable } from '@angular/core';
import { Movie } from '../types/movie.types';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { normalizeMovie } from '../utils/movie.utils';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // todo: tranfer in ENV file
  url = 'http://localhost:3000/movies';
  public ref: DynamicDialogRef | null = null;

  private moviesSource = new BehaviorSubject<Movie[]>([]);
  public movies$ = this.moviesSource.asObservable();

  constructor(private http: HttpClient) {}

  public getMovies(): Movie[] {
    return this.moviesSource.getValue();
  }

  public setMovies(movies: Movie[]) {
    this.moviesSource.next(movies);
  }

  public fetchMovies$(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url).pipe(
      tap((movies: Movie[]) => {
        return movies;
      })
    );
  }

  public fetchMovie$(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/${id}`).pipe(
      tap((res: Movie) => {
        const movie = normalizeMovie(res);
        return movie;
      })
    );
  }

  public deleteMovie$(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${this.url}/${id}`);
  }

  public updateMovie$(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.url}/${movie.id}`, movie);
  }

  public updateMovie(updatedMovie: Movie): void {
    const movies = this.getMovies();
    const updatedMovies = movies.map((movie) =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    );
    this.moviesSource.next(updatedMovies);
  }
}
