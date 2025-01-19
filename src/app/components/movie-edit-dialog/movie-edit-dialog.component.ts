import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Movie } from '../../types/movie.types';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'movie-edit-dialog',
  imports: [InputTextModule, FormsModule, ButtonModule, TextareaModule],
  templateUrl: './movie-edit-dialog.component.html',
  styleUrls: ['./movie-edit-dialog.component.css'],
})
export class MovieEditDialogComponent {
  public movie: Movie;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.movie = { ...this.config.data.movie };
  }

  onSave() {
    this.ref.close(this.movie);
  }

  onCancel() {
    this.ref.close();
  }
}
