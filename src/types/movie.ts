export interface Movie {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
} 