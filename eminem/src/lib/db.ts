import { Movie } from '@/types/movie';

// Mock database
let movies: Movie[] = [];

export const db = {
  movies: {
    findMany: () => movies,
    findUnique: (id: string) => movies.find(movie => movie.id === id),
    create: (data: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>) => {
      const movie: Movie = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
      };
      movies.push(movie);
      return movie;
    },
    update: (id: string, data: Partial<Movie>) => {
      const index = movies.findIndex(movie => movie.id === id);
      if (index === -1) return null;
      
      movies[index] = {
        ...movies[index],
        ...data,
        updatedAt: new Date(),
      };
      return movies[index];
    },
    delete: (id: string) => {
      const index = movies.findIndex(movie => movie.id === id);
      if (index === -1) return null;
      
      const movie = movies[index];
      movies = movies.filter(movie => movie.id !== id);
      return movie;
    },
  },
}; 