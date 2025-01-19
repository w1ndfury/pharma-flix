import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movie.types';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

const GET_ERROR_MESSAGE = 'Failed to load movie. Please try again later.';

@Component({
  selector: 'movie',
  imports: [CardModule, ButtonModule, ImageModule, CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
  providers: [DialogService],
})
export class MovieComponent {
  public movie!: Movie;
  public ref: DynamicDialogRef | undefined;
  public title: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.fetchMovie();
  }

  public onBackClick(): void {
    this.router.navigate(['/movies']);
  }

  private fetchMovie(): void {
    const movieId = String(this.route.snapshot.paramMap.get('id'));
    this.movieService.fetchMovie$(movieId).subscribe({
      next: (res: Movie) => {
        this.movie = res;
        this.title = res.releaseYear
          ? `${this.movie.title} (${String(this.movie.releaseYear)})`
          : `${this.movie.title}`;
      },
      error: (err) => {
        this.showErrorDialog(GET_ERROR_MESSAGE);
      },
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
}
