import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewDetails = () => {
  const location = useLocation();
  const { state } = location;
  const movie = state.movies.find((m) => m.movieId === state.movieId);
  const navigate = useNavigate(); // Add useNavigate

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Movie not found. Please try again.</p>
      </div>
    );
  }

  const handleBookNow = () => {
    // Navigate to the TheaterList and pass the movie data
    navigate("/theaterlist", { state: { movie } });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Section */}
      <div className="relative h-96">
        <img
          src={movie.poster}
          alt={movie.title}
          className="object-cover object-top w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent">
          <div className="absolute bottom-10 left-10">
            <h1 className="text-5xl font-bold text-white mb-2">
              {movie.title}
            </h1>
            <p className="text-lg font-semibold text-gray-400">
              {movie.genre.join(" • ")}
            </p>
            <p className="text-lg font-semibold text-gray-400">{movie.time}</p>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto py-8 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Movie Poster and Book Now Button */}
          <div className="flex-shrink-0">
            <img
              src={movie.img}
              alt={movie.title}
              className="w-64 h-auto rounded-lg shadow-lg mb-4 border-4 border-gray-800"
            />
            {/* Book Now Button */}
            <button
              className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-3 px-6 rounded-lg shadow-lg w-full"
              onClick={handleBookNow} // Handle button click
            >
              Book Now
            </button>
          </div>

          {/* Right Side: Movie Info */}
          <div className="flex-grow">
            <h2 className="text-3xl font-bold mb-4 text-white">
              {movie.title}
            </h2>
            <p className="text-gray-400 mb-6">{movie.desc}</p>
            {/* Tags */}
            <div className="mb-4 space-x-2">
              {movie.genre.map((genre, index) => (
                <span
                  key={index}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Cast */}
            <h3 className="text-xl font-bold mb-2 text-blue-400">Cast</h3>
            <ul className="list-disc list-inside mb-6 text-gray-300">
              {movie.cast.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>

            {/* Other Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-bold text-blue-400">Director</h4>
                <p className="text-gray-300">{movie.director}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-400">Producer</h4>
                <p className="text-gray-300">{movie.producer}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-400">
                  Music Director
                </h4>
                <p className="text-gray-300">{movie["music director"]}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-400">
                  Release Date
                </h4>
                <p className="text-gray-300">{movie.release}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
