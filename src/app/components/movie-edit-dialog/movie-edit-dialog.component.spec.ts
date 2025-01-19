import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieEditDialogComponent } from './movie-edit-dialog.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('MovieEditDialogComponent', () => {
  let component: MovieEditDialogComponent;
  let fixture: ComponentFixture<MovieEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieEditDialogComponent],
      providers: [DynamicDialogRef, ActivatedRoute, HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
