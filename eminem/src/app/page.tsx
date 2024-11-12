"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?release_date.gte={min_date}', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            accept: 'application/json',
          },
        params: {
            language: 'en-US',
            page: 1,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Upcoming Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white shadow-md rounded p-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded"
              />
              <h3 className="mt-4 font-bold text-lg">{movie.title}</h3>
              <p className="text-gray-500">Release Date: {movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
