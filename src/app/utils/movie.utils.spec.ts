import { Movie } from '../types/movie.types';
import { normalizeMovie } from './movie.utils';

describe('MovieUtils', () => {
  describe('normalizeMovie', () => {
    it('should return a normalized movie object', () => {
      const inputMovie = {
        id: '1',
        title: 'Inception',
        genre: 'Sci-Fi',
        releaseYear: 2010,
        rating: 8.8,
        director: 'Christopher Nolan',
        duration: '148 min',
        language: 'English',
        summary:
          'A skilled thief is given a chance at redemption if he can successfully perform an inception.',
        image: 'inception.jpg',
      } as Movie;

      const normalizedMovie = normalizeMovie(inputMovie);

      expect(normalizedMovie).toEqual({
        id: '1',
        title: 'Inception',
        genre: 'Inception', // It uses movie.title for genre as per your function definition
        releaseYear: 2010,
        rating: 8.8,
        director: 'Christopher Nolan',
        duration: '148 min',
        language: 'English',
        summary:
          'A skilled thief is given a chance at redemption if he can successfully perform an inception.',
        image: 'inception.jpg',
      });
    });

    it('should handle missing properties and return default values', () => {
      const inputMovie = {
        id: '',
        title: undefined,
        genre: undefined,
        releaseYear: undefined,
        rating: undefined,
        director: undefined,
        duration: undefined,
        language: undefined,
        summary: undefined,
        image: undefined,
      } as Movie;

      const normalizedMovie = normalizeMovie(inputMovie);

      expect(normalizedMovie).toEqual({
        id: '',
        title: '',
        genre: '', // genre should default to the empty string
        releaseYear: undefined,
        rating: undefined,
        director: '',
        duration: '',
        language: '',
        summary: '',
        image: '',
      });
    });
  });
});
