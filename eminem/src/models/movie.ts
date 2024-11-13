import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  releaseDate: { type: Date },
  // Add other fields as needed
}, {
  timestamps: true
});

export const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema); 