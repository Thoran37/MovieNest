import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ViewDetails = () => {
  const { state } = useLocation();
  let navigate = useNavigate();

  function gotoShows() {
    navigate(`/movie/${state.movieId}/shows`, { state: state });
  }

  if (!state) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Movie not found. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Section */}
      <div className="relative h-96">
        <img
          src={state.poster}
          alt={state.title}
          className="object-cover object-top w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent">
          <div className="absolute bottom-10 left-10">
            <h1 className="text-5xl font-bold text-white mb-2">
              {state.title}
            </h1>
            <p className="text-lg font-semibold text-gray-400">
              {state.genre.join(" • ")}
            </p>
            <p className="text-lg font-semibold text-gray-400">{state.time}</p>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto py-8 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Movie Poster and Book Now Button */}
          <div className="flex-shrink-0">
            <img
              src={state.img}
              alt={state.title}
              className="w-64 h-auto rounded-lg shadow-lg mb-4 border-4 border-gray-800"
            />
            {/* Book Now Button */}
            <button
              className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-3 px-6 rounded-lg shadow-lg w-full"
              onClick={gotoShows}
            >
              Book Now
            </button>
          </div>

          {/* Right Side: Movie Info */}
          <div className="flex-grow">
            <h2 className="text-3xl font-bold mb-4 text-white">
              {state.title}
            </h2>
            <p className="text-gray-400 mb-6">{state.desc}</p>

            {/* Tags */}
            <div className="mb-4 space-x-2">
              <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                Fantasy
              </span>
              <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                Action
              </span>
              <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                Romance
              </span>
            </div>

            {/* Cast */}
            <h3 className="text-xl font-bold mb-2 text-blue-400">Cast</h3>
            <ul className="list-disc list-inside mb-6 text-gray-300">
              {state.cast.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>

            {/* Other Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-bold text-blue-400">Director</h4>
                <p className="text-gray-300">{state.director}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-400">Producer</h4>
                <p className="text-gray-300">{state.producer}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-400">
                  Music Director
                </h4>
                <p className="text-gray-300">{state["music director"]}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-400">
                  Release Date
                </h4>
                <p className="text-gray-300">{state.release}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ViewDetails;
