import { Component } from '@angular/core';
import { Movie } from '../../types/movie.types';
import { MovieService } from '../../services/movie.service';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Column } from '../../types/column.types';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MovieEditDialogComponent } from '../movie-edit-dialog/movie-edit-dialog.component';
import { ButtonModule } from 'primeng/button';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogResponse } from '../../types/confirm-dialog.types';
import { Subscription } from 'rxjs';

const DELETE_ERROR_MESSAGE =
  'Failed to delete the movie. Please try again later.';
const UPDATE_ERROR_MESSAGE =
  'Failed to update the movie. Please try again later.';
const GET_ERROR_MESSAGE = 'Failed to load movies. Please try again later.';

@Component({
  selector: 'movies',
  imports: [
    DialogModule,
    TableModule,
    CommonModule,
    InputTextModule,
    RippleModule,
    ButtonModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
  providers: [DialogService],
})
export class MoviesComponent {
  public movies: Movie[] = [];
  public cols!: Column[];
  public ref: DynamicDialogRef | undefined;

  private moviesSubscription: Subscription = new Subscription();

  constructor(
    private movieService: MovieService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.generateMoviesTableColumns();
    this.fetchMovies();
    this.setMoviesSubscription();
  }

  ngOnDestroy(): void {
    this.moviesSubscription?.unsubscribe();
  }

  private setMoviesSubscription(): void {
    this.moviesSubscription = this.movieService.movies$.subscribe((movies) => {
      this.movies = movies;
    });
  }

  private generateMoviesTableColumns(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'genre', header: 'Genre' },
      { field: 'releaseYear', header: 'Release Year' },
      { field: 'rating', header: 'Rating' },
      { field: '', header: '' },
      { field: '', header: '' },
    ];
  }

  private fetchMovies(): void {
    this.movieService.fetchMovies$().subscribe({
      next: (res: Movie[]) => {
        this.movieService.setMovies(res);
      },
      error: (err) => {
        this.showErrorDialog(GET_ERROR_MESSAGE);
      },
    });
  }

  private openMovieEditDialog(movie: Movie): void {
    this.ref = this.dialogService.open(MovieEditDialogComponent, {
      data: {
        movie: movie,
      },
      header: 'Edit Movie',
      modal: true,
      width: '50vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });

    this.ref.onClose.subscribe((movie: Movie) => {
      if (movie) {
        this.movieService.updateMovie$(movie).subscribe({
          next: (res: Movie) => {
            this.movieService.updateMovie(res);
          },
          error: (err) => {
            this.showErrorDialog(UPDATE_ERROR_MESSAGE);
          },
        });
      }
    });
  }

  private showErrorDialog(message: string): void {
    this.ref = this.dialogService.open(ErrorDialogComponent, {
      header: 'Error',
      modal: true,
      width: '50vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        errorMessage: message,
      },
    });
  }

  private openMovieDeleteConfirmDialog(movie: Movie): void {
    this.ref = this.dialogService.open(ConfirmDialogComponent, {
      data: {
        confirmButtonLabel: 'Delete',
      },
      header: 'Delete Movie',
      modal: true,
      width: '50vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });

    this.ref.onClose.subscribe((data: ConfirmDialogResponse) => {
      if (data.confirm) this.deleteMovie(movie.id);
    });
  }

  public onMovieDelete(movie: Movie) {
    if (!movie?.id) return;
    this.openMovieDeleteConfirmDialog(movie);
  }

  public deleteMovie(id: string): void {
    this.movieService.deleteMovie$(id).subscribe({
      next: (res: Movie) => {
        const movies = this.movieService
          .getMovies()
          .filter((movie) => movie.id !== res.id);
        this.movieService.setMovies(movies);
      },
      error: (err) => {
        this.showErrorDialog(DELETE_ERROR_MESSAGE);
      },
    });
  }

  public handleSelect(event: any) {
    const selectedMovie = event.data;
    this.router.navigate(['/movies', selectedMovie.id]);
  }

  public onMovieEdit(movie: Movie) {
    if (!movie) return;
    this.openMovieEditDialog(movie);
  }
}
