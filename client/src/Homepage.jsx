import * as React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Homepage() {
  const movies = [
    {
      movieId: 1,
      title: "Inception",
      type: "Sci-Fi",
      duration: "148 min",
      description: "A thief who steals corporate secrets through dream-sharing technology is given a chance to erase his criminal history.",
      imageUrl: "https://c4.wallpaperflare.com/wallpaper/592/1022/336/inception-cast-wallpaper-preview.jpg",
    },
    {
      movieId: 2,
      title: "The Matrix",
      type: "Action",
      duration: "136 min",
      description: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
      imageUrl: "",
    },
    {
      movieId: 3,
      title: "Interstellar",
      type: "Adventure",
      duration: "169 min",
      description: "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
      imageUrl: "",
    },
    {
      movieId: 4,
      title: "The Dark Knight",
      type: "Action",
      duration: "152 min",
      description: "Batman raises the stakes in his war on crime with the help of a lieutenant and the district attorney.",
      imageUrl: "",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Carousel Section */}
      <div className="relative w-full">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem key={movie.movieId} className="relative flex-shrink-0 w-full h-96">
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex items-start justify-center">
                  <div className="text-center text-white p-12 bg-black bg-opacity-70 rounded-lg shadow-lg max-w-md">
                    <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
                    <p className="text-lg font-semibold">{movie.type} • {movie.duration}</p>
                    <p className="mt-4 text-sm">{movie.description}</p>
                    <Link 
                      to={`/movie/${movie.title}`}
                      state={{ movies }} // Pass movies as state
                    >
                      <button className="mt-6 bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-6 rounded-lg shadow-lg">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-300 ease-in-out text-white p-2 rounded-full">
            &#9664;
          </CarouselPrevious>

          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-300 ease-in-out text-white p-2 rounded-full">
            &#9654;
          </CarouselNext>
        </Carousel>
      </div>

      {/* Card Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
        {movies.map((movie) => (
          <Card key={movie.movieId} className="bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            <CardHeader className="p-0">
              <img src={movie.imageUrl} alt={movie.title} className="w-full h-48 object-cover rounded-t-lg" />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl font-bold">{movie.title}</CardTitle>
              <CardDescription className="text-sm text-gray-400">{movie.type} • {movie.duration}</CardDescription>
              <p className="mt-4 text-sm">{movie.description}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Link 
                to={`/movie/${movie.title}`} 
                state={{ movies }} // Pass movies as state
              >
                <button className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-lg shadow-lg w-full">
                  View Details
                </button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
