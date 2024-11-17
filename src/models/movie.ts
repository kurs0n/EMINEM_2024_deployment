import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  release_date: { type: String, required: true },
  poster_path: { type: String, required: true },
}, {
  timestamps: true
});

export const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema); 