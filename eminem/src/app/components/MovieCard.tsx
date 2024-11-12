import Image from 'next/image';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={300} height={450} className="rounded" />
      <h3 className="mt-4 font-bold text-lg">{movie.title}</h3>
      <p className="text-gray-500">Release Date: {movie.release_date}</p>
    </div>
  );
};

export default MovieCard;