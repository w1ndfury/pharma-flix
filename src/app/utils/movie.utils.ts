import { Movie } from '../types/movie.types';

export function normalizeMovie(movie: Movie): Movie {
  return {
    id: movie.id ?? '',
    title: movie.title ?? '',
    genre: movie.title ?? '',
    releaseYear: movie.releaseYear ?? undefined,
    rating: movie.rating ?? undefined,
    director: movie.director ?? '',
    duration: movie.duration ?? '',
    language: movie.language ?? '',
    summary: movie.summary ?? '',
    image: movie.image ?? '',
  };
}
