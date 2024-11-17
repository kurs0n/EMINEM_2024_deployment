"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

interface Movie {
  _id: string;
  title: string;
  release_date: string;
  poster_path: string;
}

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    release_date: '',
    poster_path: ''
  });
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('/api/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMovie) {
        await axios.put(`/api/movies/${editingMovie._id}`, formData);
      } else {
        await axios.post('/api/movies', formData);
      }
      fetchMovies();
      setFormData({ title: '', release_date: '', poster_path: '' });
      setEditingMovie(null);
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      release_date: movie.release_date,
      poster_path: movie.poster_path
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder-movie.jpg';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Movies</h1>
        
        {/* Movie Form */}
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Movie Title</label>
              <input
                type="text"
                placeholder="Movie Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Release Date</label>
              <input
                type="date"
                value={formData.release_date}
                onChange={(e) => setFormData({...formData, release_date: formatDate(e.target.value)})}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Poster Path</label>
              <input
                type="text"
                placeholder="e.g., /1234567890.jpg"
                value={formData.poster_path}
                onChange={(e) => setFormData({...formData, poster_path: e.target.value})}
                className="border p-2 rounded w-full"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter the TMDB poster path (e.g., /1234567890.jpg)
              </p>
            </div>
            <button 
              type="submit" 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {editingMovie ? 'Update Movie' : 'Add Movie'}
            </button>
          </div>
        </form>

        {/* Movies List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie._id} className="bg-white shadow-md rounded p-4">
              <div className="relative pt-[150%]">
                <img
                  src={`${movie.poster_path}`}
                  alt={movie.title}
                  onError={handleImageError}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded"
                />
              </div>
              <h3 className="mt-4 font-bold text-lg">{movie.title}</h3>
              <p className="text-gray-500">
                Release Date: {new Date(movie.release_date).toLocaleDateString()}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(movie)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage; 